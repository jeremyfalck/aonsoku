import { subsonic } from "@/service/subsonic";
import { ISong } from "@/types/responses/song";

export function useSongList() {
  async function getArtistSongCount(id: string) {
    const response = await subsonic.artists.getOne(id);
    let count = 0;

    if (!response) return count;

    response.album.forEach((item) => {
      count += item.songCount;
    });

    return count;
  }

  async function getArtistAllSongs(name: string) {
    const response = await subsonic.search.get({
      query: name,
      songCount: 9999999,
      albumCount: 0,
      artistCount: 0,
    });

    if (response?.song) return response.song;
  }

  async function getAlbumSongs(albumId: string) {
    const songs = await subsonic.albums.getOne(albumId);

    if (songs?.song) return songs.song;
  }

  async function getAllSongs(): Promise<ISong[]> {
    return await subsonic.songs.getAllSongs(9999999);
  }

  return {
    getArtistSongCount,
    getArtistAllSongs,
    getAlbumSongs,
    getAllSongs,
  };
}
