package com.dimulski.fullstack.service.logic;

import com.dimulski.fullstack.data.model.Song;
import com.dimulski.fullstack.data.repo.SongRepository;
import com.dimulski.fullstack.service.payload.request.AddSongRequest;
import com.dimulski.fullstack.service.payload.request.RemoveSongRequest;
import com.dimulski.fullstack.service.payload.response.SongResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.co.caprica.vlcj.player.component.AudioPlayerComponent;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlayerService {
    private final SongRepository songRepository;
    private final AudioPlayerComponent player;

    @Autowired
    public PlayerService(SongRepository songRepository) {
        this.songRepository = songRepository;
        this.player = new AudioPlayerComponent();
    }

    public List<SongResponse> list() {
        // Get playlist
        List<Song> songPlaylist = this.songRepository.findAll();

        // Convert playlist.
        List<SongResponse> songResponse = songPlaylist.stream().map(SongResponse::parse).collect(Collectors.toList());

        // Return playlist.
        return songResponse;
    }

    public void add(AddSongRequest request) {
        // Convert request.
        Song song = new Song();
        song.setArtistName(request.getArtistName());
        song.setSongName(request.getSongName());
        song.setMrl(request.getMrl());

        // Add song to playlist.
        this.songRepository.save(song);
    }

    public void remove(RemoveSongRequest request) {
        // Remove song from playlist.
        this.songRepository.deleteById(request.getId());
    }
}
