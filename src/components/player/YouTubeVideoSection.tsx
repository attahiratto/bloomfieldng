import { useState } from "react";
import { Play, Plus, Trash2, Loader2, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMyVideos, useAddVideo, useDeleteVideo } from "@/hooks/usePlayerData";
import { useToast } from "@/hooks/use-toast";

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const match = url.match(p);
    if (match) return match[1];
  }
  return null;
}

const YouTubeVideoSection = () => {
  const { data: videos, isLoading } = useMyVideos();
  const addVideo = useAddVideo();
  const deleteVideo = useDeleteVideo();
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    const videoId = extractYouTubeId(url.trim());
    if (!videoId) {
      toast({ title: "Invalid YouTube URL", description: "Please paste a valid YouTube video link.", variant: "destructive" });
      return;
    }
    addVideo.mutate(
      { youtube_url: url.trim(), title: title.trim() || undefined },
      {
        onSuccess: () => {
          setUrl("");
          setTitle("");
          toast({ title: "Video added!" });
        },
        onError: (err: any) => {
          toast({ title: "Failed to add video", description: err.message, variant: "destructive" });
        },
      }
    );
  };

  return (
    <div className="espn-card rounded-2xl overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-destructive to-orange-400" />
      <div className="p-6">
        <h2 className="font-display text-xl font-bold text-white flex items-center gap-2 mb-4">
          <Play className="w-5 h-5 text-destructive" /> Highlight Videos
        </h2>

        {/* Add video form */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <div className="flex-1 flex gap-2">
            <Input
              placeholder="Paste YouTube URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
            />
            <Input
              placeholder="Title (optional)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 max-w-[200px]"
            />
          </div>
          <Button
            onClick={handleAdd}
            disabled={addVideo.isPending || !url.trim()}
            className="shrink-0"
          >
            {addVideo.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
            Add Video
          </Button>
        </div>

        {/* Video list */}
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : videos && videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.map((video) => {
              const videoId = extractYouTubeId(video.youtube_url);
              return (
                <div key={video.id} className="rounded-xl overflow-hidden border border-white/10 bg-white/5">
                  <div className="aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={video.title || "Highlight video"}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex items-center justify-between p-3">
                    <p className="text-sm text-white/70 truncate">{video.title || "Untitled"}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white/40 hover:text-destructive shrink-0"
                      onClick={() => deleteVideo.mutate(video.id)}
                      disabled={deleteVideo.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="aspect-video max-w-md mx-auto rounded-xl bg-white/5 flex items-center justify-center border-2 border-dashed border-white/20">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-3">
                <Youtube className="w-8 h-8 text-destructive" />
              </div>
              <p className="text-white/70 font-medium">No highlight videos yet</p>
              <p className="text-sm text-white/40">Paste a YouTube link above to add one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default YouTubeVideoSection;
