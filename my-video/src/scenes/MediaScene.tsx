import React from "react";
import {
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FeatureSceneLayout } from "../components/FeatureSceneLayout";
import { GlowOrb } from "../components/GlowOrb";
import { MediaPreviewPlaceholder } from "../components/MediaPreviewPlaceholder";
import { stockImageForSeed } from "../lib/stockAssets";
import { COLORS, FONT, GRADIENT } from "../lib/brand";
import { SPRING_SNAPPY, SPRING_SMOOTH } from "../lib/easings";

/** Mirrors `ProjectAssets` + `ProjectAssetsHeader` + `ProjectFolder` / `ProjectFile` layout from the Kreatli app. */

type MockFile = {
  id: string;
  name: string;
  kind: "video" | "image";
  sizeLabel: string;
  statusLabel: string;
  statusColor: string;
  assigneeInitial: string;
  assigneeHue: number;
  comments: number;
  thumbSeed: number;
  draggable?: boolean;
};

const MOCK_FOLDERS: {
  id: string;
  name: string;
  fileCount: number;
  sizeLabel: string;
}[] = [
  { id: "f1", name: "Client selects", fileCount: 2, sizeLabel: "840 MB" },
  { id: "f2", name: "Brand kit", fileCount: 5, sizeLabel: "48 MB" },
];

const MOCK_FILES: MockFile[] = [
  {
    id: "a",
    name: "interview_cam_a.mp4",
    kind: "video",
    sizeLabel: "1.2 GB",
    statusLabel: "In review",
    statusColor: COLORS.warning,
    assigneeInitial: "J",
    assigneeHue: 280,
    comments: 4,
    thumbSeed: 11,
  },
  {
    id: "b",
    name: "broll_downtown.jpg",
    kind: "image",
    sizeLabel: "820 KB",
    statusLabel: "Approved",
    statusColor: COLORS.success,
    assigneeInitial: "S",
    assigneeHue: 120,
    comments: 1,
    thumbSeed: 12,
  },
  {
    id: "c",
    name: "hero_cut_v3.mp4",
    kind: "video",
    sizeLabel: "2.1 GB",
    statusLabel: "Needs review",
    statusColor: COLORS.pink,
    assigneeInitial: "M",
    assigneeHue: 200,
    comments: 7,
    thumbSeed: 13,
    draggable: true,
  },
];

function FolderIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v11z"
        stroke={COLORS.whiteAlpha40}
        strokeWidth="2"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      style={{ opacity: 0.5 }}
    >
      <circle
        cx="11"
        cy="11"
        r="7"
        stroke={COLORS.whiteAlpha60}
        strokeWidth="2"
      />
      <path
        d="M20 20l-4-4"
        stroke={COLORS.whiteAlpha60}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={COLORS.whiteAlpha60}>
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  );
}

export const MediaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const topTextEntrance = spring({
    frame,
    fps,
    config: SPRING_SMOOTH,
    delay: 3,
  });

  const dragStart = fps * 1.15;
  const dragMid = fps * 1.95;
  const dragEnd = fps * 2.7;
  const isDragging = frame >= dragStart && frame < dragEnd;
  const afterDrop = frame >= dragEnd;

  const dragT = interpolate(frame, [dragStart, dragMid, dragEnd], [0, 0.5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ghostX = interpolate(dragT, [0, 1], [520, 120]);
  const ghostY = interpolate(dragT, [0, 0.5, 1], [310, 250, 195]);
  const ghostScale = interpolate(
    frame,
    [dragStart, dragStart + 8, dragEnd - 10, dragEnd],
    [1, 1.02, 0.82, 0.82],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const folderDropTargetIdx = 0;
  const folderHighlight =
    isDragging && dragT > 0.35
      ? interpolate(dragT, [0.35, 0.7], [0, 1], { extrapolateRight: "clamp" })
      : 0;
  const folderPulse = spring({
    frame: Math.max(0, frame - dragEnd),
    fps,
    config: SPRING_SNAPPY,
    delay: 0,
  });
  const droppedFolderGlow = afterDrop
    ? interpolate(folderPulse, [0, 1], [0.35, 1])
    : 0;

  const dragged = MOCK_FILES.find((f) => f.draggable)!;
  const clientFolderCount =
    MOCK_FOLDERS[folderDropTargetIdx].fileCount + (afterDrop ? 1 : 0);

  return (
    <FeatureSceneLayout
      headlineOpacity={topTextEntrance}
      headlineTransform={`translateY(${interpolate(topTextEntrance, [0, 1], [-12, 0])}px)`}
      motionAccent="cyan"
      motionDelay={8}
      orb={
        <GlowOrb
          x="28%"
          y="48%"
          size={440}
          color1={COLORS.cyan}
          color2={COLORS.primary}
          opacity={0.09}
        />
      }
      headline={
        <div
          style={{
            fontFamily: FONT.family,
            fontSize: 36,
            fontWeight: FONT.regular,
            lineHeight: 1.22,
            letterSpacing: "-0.02em",
            color: COLORS.whiteAlpha60,
            textAlign: "center",
          }}
        >
          Project media, organized.{" "}
          <span
            style={{
              fontWeight: FONT.bold,
              background: GRADIENT.brandText,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Folders, status, owners—one view.
          </span>
        </div>
      }
    >
      <div
        style={{
          width: 1060,
          padding: "12px 14px",
          background: COLORS.darkCard,
          borderRadius: 16,
          border: `1px solid ${COLORS.darkBorder}`,
          boxShadow: `0 24px 90px rgba(0,0,0,0.55), 0 0 40px ${COLORS.cyan}12`,
          position: "relative",
        }}
      >
        {/* ProjectAssetsHeader — title, meta, search + filters, upload group */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 12,
            marginBottom: 20,
          }}
        >
          <div style={{ flex: "1 1 200px", minWidth: 0 }}>
            <h2
              style={{
                fontFamily: FONT.family,
                fontSize: 26,
                fontWeight: FONT.semibold,
                color: COLORS.white,
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Media
            </h2>
            <span
              style={{
                fontFamily: FONT.family,
                fontSize: 14,
                color: COLORS.whiteAlpha40,
                display: "block",
                marginTop: 2,
              }}
            >
              127 files, 45.2 GB
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              flexWrap: "wrap",
              justifyContent: "flex-end",
              gap: 16,
              flex: "1 1 280px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 0 4px",
                borderBottom: `1px solid ${COLORS.darkBorder}`,
                minWidth: 160,
                flex: "1 1 160px",
              }}
            >
              <SearchIcon />
              <span
                style={{
                  fontFamily: FONT.family,
                  fontSize: 14,
                  color: COLORS.whiteAlpha40,
                }}
              >
                Search
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 14px",
                borderRadius: 12,
                background: COLORS.foreground100,
                border: `1px solid ${COLORS.darkBorder}`,
                fontFamily: FONT.family,
                fontSize: 14,
                fontWeight: FONT.medium,
                color: COLORS.whiteAlpha60,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 6h16M7 12h10M10 18h4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Filters
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 16px",
                borderRadius: "12px 0 0 12px",
                background: COLORS.white,
                fontFamily: FONT.family,
                fontSize: 14,
                fontWeight: FONT.semibold,
                color: COLORS.darkBg,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                  stroke={COLORS.darkBg}
                  strokeWidth="2"
                />
                <polyline
                  points="17,8 12,3 7,8"
                  stroke={COLORS.darkBg}
                  strokeWidth="2"
                  fill="none"
                />
                <line
                  x1="12"
                  y1="3"
                  x2="12"
                  y2="15"
                  stroke={COLORS.darkBg}
                  strokeWidth="2"
                />
              </svg>
              Upload
            </div>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "0 12px 12px 0",
                marginLeft: 1,
                background: COLORS.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderLeft: `1px solid ${COLORS.darkBorder}`,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 9l6 6 6-6"
                  stroke={COLORS.darkBg}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Folders row — ProjectFolder grid (minmax 280px) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px 16px",
            rowGap: 8,
            marginBottom: 24,
          }}
        >
          {MOCK_FOLDERS.map((folder, i) => {
            const rowIn = spring({
              frame,
              fps,
              config: SPRING_SNAPPY,
              delay: 12 + i * 5,
            });
            const isTarget = i === folderDropTargetIdx;
            const showOutline =
              (isTarget && isDragging && folderHighlight > 0.15) ||
              (isTarget && afterDrop);
            const outlineStrength = isTarget
              ? Math.max(folderHighlight, droppedFolderGlow * 0.85)
              : 0;

            return (
              <div
                key={folder.id}
                style={{
                  position: "relative",
                  opacity: interpolate(rowIn, [0, 0.35], [0, 1], {
                    extrapolateRight: "clamp",
                  }),
                  transform: `translateY(${interpolate(rowIn, [0, 1], [10, 0])}px)`,
                }}
              >
                <div
                  style={{
                    borderRadius: 16,
                    border: `1px solid ${COLORS.darkBorder}`,
                    background: COLORS.foreground50,
                    padding: 10,
                    outline: showOutline
                      ? `2px solid rgba(0, 111, 238, ${0.35 + outlineStrength * 0.45})`
                      : "none",
                    outlineOffset: 2,
                    boxShadow:
                      isTarget && afterDrop
                        ? `0 0 0 1px rgba(0, 111, 238, 0.4), 0 12px 36px rgba(0, 111, 238, 0.15)`
                        : "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flex: 1,
                        flexDirection: "column",
                        gap: 4,
                        minWidth: 0,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          minWidth: 0,
                        }}
                      >
                        <FolderIcon />
                        <span
                          style={{
                            fontFamily: FONT.family,
                            fontWeight: FONT.semibold,
                            fontSize: 15,
                            color: COLORS.white,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {folder.name}
                        </span>
                      </div>
                      <div
                        style={{
                          fontFamily: FONT.family,
                          fontSize: 13,
                          color: COLORS.whiteAlpha40,
                        }}
                      >
                        {i === folderDropTargetIdx && afterDrop
                          ? `${clientFolderCount} files, ${folder.sizeLabel}`
                          : `${folder.fileCount} files, ${folder.sizeLabel}`}
                      </div>
                    </div>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: COLORS.foreground100,
                        border: `1px solid ${COLORS.darkBorder}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <DotsIcon />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Files grid — ProjectFile */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px 16px",
            rowGap: 24,
            padding: 4,
          }}
        >
          {MOCK_FILES.map((file, i) => {
            const rowIn = spring({
              frame,
              fps,
              config: SPRING_SNAPPY,
              delay: 22 + i * 6,
            });
            const dim = file.draggable && isDragging;

            return (
              <div
                key={file.id}
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  opacity: interpolate(rowIn, [0, 0.35], [0, 1], {
                    extrapolateRight: "clamp",
                  }),
                  transform: `translateY(${interpolate(rowIn, [0, 1], [14, 0])}px)`,
                  filter: dim ? "brightness(0.5)" : "none",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    borderRadius: 16,
                    overflow: "hidden",
                    border: `1px solid ${COLORS.darkBorder}`,
                    background: COLORS.foreground50,
                    aspectRatio: "16 / 9",
                  }}
                >
                  <div style={{ position: "absolute", inset: 0 }}>
                    {file.kind === "video" ? (
                      <MediaPreviewPlaceholder
                        uniqueId={`pf-${file.id}`}
                        variant="video"
                        seed={file.thumbSeed}
                      />
                    ) : (
                      <Img
                        src={stockImageForSeed(file.thumbSeed)}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>
                  {/* Status chip — ProjectFileStatus position */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 10,
                      left: 10,
                      zIndex: 5,
                    }}
                  >
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "4px 10px",
                        borderRadius: 999,
                        background: COLORS.foreground100,
                        border: `1px solid ${COLORS.darkBorder}`,
                        fontFamily: FONT.family,
                        fontSize: 12,
                        fontWeight: FONT.medium,
                        color: COLORS.white,
                        maxWidth: 200,
                      }}
                    >
                      <span
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          background: file.statusColor,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {file.statusLabel}
                      </span>
                    </div>
                  </div>
                  {/* Size chip — ProjectFileCover */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 10,
                      right: 10,
                      zIndex: 5,
                    }}
                  >
                    <div
                      style={{
                        padding: "4px 10px",
                        borderRadius: 999,
                        background: `${COLORS.foreground100}ee`,
                        border: `1px solid ${COLORS.darkBorder}`,
                        fontFamily: FONT.family,
                        fontSize: 12,
                        fontWeight: FONT.semibold,
                        color: COLORS.whiteAlpha80,
                      }}
                    >
                      {file.sizeLabel}
                    </div>
                  </div>
                  {/* ⋯ menu — ProjectFile */}
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      zIndex: 5,
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: `${COLORS.foreground100}cc`,
                      border: `1px solid ${COLORS.darkBorder}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <DotsIcon />
                  </div>
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <div
                    style={{
                      fontFamily: FONT.family,
                      fontSize: 17,
                      fontWeight: FONT.semibold,
                      color: COLORS.white,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {file.name}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        border: `2px solid ${COLORS.darkBorder}`,
                        background: `hsl(${file.assigneeHue}, 50%, 42%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: FONT.family,
                        fontSize: 14,
                        fontWeight: FONT.bold,
                        color: COLORS.white,
                      }}
                    >
                      {file.assigneeInitial}
                    </div>
                    <span
                      style={{
                        fontFamily: FONT.family,
                        fontSize: 13,
                        color: COLORS.whiteAlpha40,
                      }}
                    >
                      {file.comments}{" "}
                      {file.comments === 1 ? "comment" : "comments"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* DragOverlay-style ghost — ProjectFileCover */}
        {isDragging && (
          <div
            style={{
              position: "absolute",
              left: ghostX,
              top: ghostY,
              width: 260,
              zIndex: 40,
              pointerEvents: "none",
              transform: `scale(${ghostScale})`,
              filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.55))",
            }}
          >
            <div
              style={{
                borderRadius: 16,
                overflow: "hidden",
                border: `1px solid ${COLORS.primary}66`,
                background: COLORS.foreground50,
                aspectRatio: "16 / 9",
              }}
            >
              <MediaPreviewPlaceholder
                uniqueId="media-dnd-overlay"
                variant="video"
                seed={dragged.thumbSeed}
              />
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: FONT.family,
                fontSize: 13,
                fontWeight: FONT.semibold,
                color: COLORS.white,
                textAlign: "center",
              }}
            >
              {dragged.name}
            </div>
          </div>
        )}
      </div>
    </FeatureSceneLayout>
  );
};
