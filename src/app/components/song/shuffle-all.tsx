import { Shuffle } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import { usePlayerActions } from "@/store/player.store";
import { useSongList } from "@/app/hooks/use-song-list";
import { ISong } from "@/types/responses/song";

export const ShuffleAllButton = () => {
  const { t } = useTranslation();

  const { setSongList } = usePlayerActions();

  const { getAllSongs } = useSongList();

  function shuffle(array: ISong[]) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        getAllSongs().then((songs: ISong[]) => {
          shuffle(songs);
          let songsToPlay: ISong[] = songs;
          if (songs.length > 1000) {
            songsToPlay = songs.slice(0, 1000);
          }
          setSongList(songsToPlay, 0, true);
        })
      }
    >
      <Shuffle className="w-4 h-4 mr-2" />
      {t("songs.list.shuffleAll")}
    </Button>
  );
};
