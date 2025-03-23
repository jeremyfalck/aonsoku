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

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        getAllSongs().then((songs: ISong[]) => {
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
