import Song from "../model/Song";
import AddSongRequest from "../request/AddSongRequest";
import LoadSongRequest from "../request/LoadSongRequest";
import RemoveSongRequest from "../request/RemoveSongRequest";

export const getBaseUrl = (): string => {
  return "http://localhost:8080";
};

export const callApiGET = async (url: string) => {
  let objects: any = "";

  try {
    await fetch(getBaseUrl() + "/api" + url);
  } catch (error) {
    console.error("Error calling API. Message: " + error);
  }

  return objects;
};

export const fetchApiGET = async (url: string) => {
  let objects: any = "";

  try {
    const response = await fetch(getBaseUrl() + "/api" + url);

    objects = await response.json();
  } catch (error) {
    console.error("Error fetching response from API. Message: " + error);
  }

  return objects;
};

const callApiPOST = async (url: string, body?: BodyInit) => {
  try {
    const init: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };

    await fetch(getBaseUrl() + "/api" + url, init);
  } catch (error) {
    console.error("Error calling API. Message: " + error);
  }
};

export const fetchPlaylist = async (): Promise<Song[]> => {
  let playlist: Song[] = [];

  try {
    playlist = await fetchApiGET("/player/playlist");
  } catch (error) {
    console.error("Error fetching playlist: ", error);
  }

  return playlist;
};

export const addSong = async (
  artistName: string,
  songName: string,
  mrl: string
) => {
  const request: AddSongRequest = {
    artistName,
    songName,
    mrl,
  };

  await callApiPOST("/player/playlist/add", JSON.stringify(request));
};

export const removeSong = async (songId: number) => {
  const request: RemoveSongRequest = {
    id: songId,
  };

  await callApiPOST("/player/playlist/remove", JSON.stringify(request));
};

export const loadSong = async (songId: number) => {
  const request: LoadSongRequest = {
    id: songId,
  };

  await callApiPOST("/player/playlist/load", JSON.stringify(request));
};

export const playSong = async () => {
  await callApiGET("/player/control/play");
};

export const pauseSong = async () => {
  await callApiGET("/player/control/pause");
};

export const stopSong = async () => {
  await callApiGET("/player/control/stop");
};
