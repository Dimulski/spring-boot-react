package com.dimulski.fullstack.data.repo;

import com.dimulski.fullstack.data.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SongRepository extends JpaRepository<Song, Long> {

}
