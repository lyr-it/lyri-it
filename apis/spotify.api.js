const apiLyric = require("lyric-get");
const request = require('request');
const translate = require('translate');
translate.engine = 'yandex';
translate.key = 'trnsl.1.1.20180219T151447Z.5d900ff594412061.1db5dabfffc85b50574728342afc43f32c8e8abf';

module.exports.currentPlaying = (user, next) => {
  const accessToken = user.social.accessToken;
  // TODO: use request lib
  // request("https://api.spotify.com/v1/me/player/currently-playing" -H `Authorization: Bearer ${accessToken}`)

  request("https://api.spotify.com/v1/me/player/currently-playing", {
    'auth': {
      'bearer': accessToken
    }
  }, (error, res, song) => {
    console.log("Si el console.log esta vacio seria de 0 y es de: "+song.length)
    if(song.length !== 0){
      // console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', res && res.statusCode); // Print the response status code if a response was received
      //console.log('body:', song); // Print the HTML for the Google homepage.
      const track = JSON.parse(song); // Object.keys & Object.values // TypeOf
      // console.log(Object.keys(track)); // [ 'timestamp', 'progress_ms', 'is_playing', 'item', 'context' ]
      // console.log(track.item.artists[0].name);
      // console.log(track.item.name);
      // console.log(track.item)
      const currentSong = {
        nameArtists: track.item.artists[0].name,
        nameSong: track.item.name
      }
        
  
      //liricas
  
      apiLyric.get(currentSong.nameArtists, currentSong.nameSong, function (err, res) {
        if (err) {
          console.log(err);
        }
        else {
          // console.log(res);
          // console.log(typeof(res));
          currentSong.lyricSong = res;
          // console.log(currentSong)
          // console.log(typeof(currentSong))
          // console.log(currentSong)
          // console.log(currentSong.lyricSong)
          const textLyric = currentSong.lyricSong.toString();
          // console.log("texto de la variable: "+textLyric);
          translate(textLyric, { to: 'es'}).then(text => {
            currentSong.translateLyricSong = text;
            // console.log(currentSong);
            next(null, currentSong);

          });        
        }
      });
    }else{
      console.log("El tipo de currentSong es: "+typeof(currentSong))
      next(null, currentSong)
    }
  });
}
