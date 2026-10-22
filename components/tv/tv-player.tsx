"use client";
import { useCallback } from "react";
import { StoryboardPlayer } from "./storyboard-player";
import { saveVideoProgressAction } from "@/lib/actions/tv";
import type { VideoScript } from "@/lib/db/schema";

export function TvPlayer(props: { videoId: string; script: VideoScript; mediaUrl: string | null; captionsVttUrl: string | null; seed: string; title: string; initialSeconds: number }) {
  const { videoId } = props;
  const onProgress = useCallback((s: number, completed: boolean) => { void saveVideoProgressAction(videoId, s, completed); }, [videoId]);
  return <StoryboardPlayer {...props} onProgress={onProgress} />;
}
