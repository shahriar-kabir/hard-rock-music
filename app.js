
searchBtn = () => {
    const userInput = document.getElementById('user-input').value;
    const url = `https://api.lyrics.ovh/suggest/${userInput}`
    fetch(url)
        .then(res => res.json())
        .then(data => collectSongs(data.data))
}

collectSongs = songs => {
    console.log(songs);
    const searchSong = document.getElementById("search-song");
    document.getElementById("search-song").innerText = '';
  

    songs.forEach(song => {

        const songDiv = document.createElement('div');
        songDiv.className = "single-result row align-items-center my-3 p-3"
        songDiv.innerHTML = `
            <div class="col-md-9">
                <h4 class="lyrics-name">${song.title}</h4>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls  class = "audio">
                    <source src="${song.preview}" type="audio/ogg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick = "getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        </div>
        `
        searchSong.appendChild(songDiv);
        
        // document.getElementById("show-lyrics").innerText = '';

        

    });

}

getLyrics = (artist,title) =>{
    const lyricsUrl = `https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(lyricsUrl)
    .then(res => res.json())
    .then(data => displayLyrics(data.lyrics) )

    displayLyrics = lyrics =>{
        const divLyrics = document.getElementById("show-lyrics");
        
        divLyrics.innerText = lyrics;
    
    }
}

