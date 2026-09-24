"use client";

// Adapted from the SmoothCursor component (motion/react). Uses framer-motion,
// which exposes the same API and is already a dependency. Adds an optional
// `scope` element: the cursor only shows, and the system cursor is only
// hidden, while the pointer is inside it.

import { motion, useSpring } from "framer-motion";
import { FC, JSX, useEffect, useRef, useState } from "react";

interface Position {
  x: number;
  y: number;
}

export interface SmoothCursorProps {
  cursor?: JSX.Element;
  scope?: HTMLElement | null;
  springConfig?: {
    damping: number;
    stiffness: number;
    mass: number;
    restDelta: number;
  };
}

const DefaultCursorSVG: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={50}
      height={54}
      viewBox="0 0 50 54"
      fill="none"
      style={{ scale: 0.5 }}
    >
      <path
        d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
        fill="black"
        stroke="white"
        strokeWidth={2.25825}
      />
    </svg>
  );
};

export function SmoothCursor({
  cursor = <DefaultCursorSVG />,
  scope = null,
  springConfig = {
    damping: 45,
    stiffness: 400,
    mass: 1,
    restDelta: 0.001,
  },
}: SmoothCursorProps) {
  // Scoped cursors are mounted from a mouseenter, so they start inside.
  const [inside, setInside] = useState(true);
  const hasPosition = useRef(false);
  const lastMousePos = useRef<Position>({ x: 0, y: 0 });
  const velocity = useRef<Position>({ x: 0, y: 0 });
  const lastUpdateTime = useRef(Date.now());
  const previousAngle = useRef(0);
  const accumulatedRotation = useRef(0);

  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const rotation = useSpring(0, {
    ...springConfig,
    damping: 60,
    stiffness: 300,
  });
  const scale = useSpring(1, {
    ...springConfig,
    stiffness: 500,
    damping: 35,
  });

  useEffect(() => {
    const target: HTMLElement | Window = scope ?? window;
    let timeout = 0;

    const updateVelocity = (currentPos: Position) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastUpdateTime.current;
      if (deltaTime > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime,
        };
      }
      lastUpdateTime.current = currentTime;
      lastMousePos.current = currentPos;
    };

    const smoothMouseMove = (e: MouseEvent) => {
      const currentPos = { x: e.clientX, y: e.clientY };
      updateVelocity(currentPos);
      const speed = Math.hypot(velocity.current.x, velocity.current.y);

      if (!hasPosition.current) {
        // First event: appear under the pointer instead of flying in from 0,0.
        cursorX.jump(currentPos.x);
        cursorY.jump(currentPos.y);
        hasPosition.current = true;
      }
      cursorX.set(currentPos.x);
      cursorY.set(currentPos.y);

      if (speed > 0.1) {
        const currentAngle =
          Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) + 90;
        let angleDiff = currentAngle - previousAngle.current;
        if (angleDiff > 180) angleDiff -= 360;
        if (angleDiff < -180) angleDiff += 360;
        accumulatedRotation.current += angleDiff;
        rotation.set(accumulatedRotation.current);
        previousAngle.current = currentAngle;

        scale.set(0.95);
        window.clearTimeout(timeout);
        timeout = window.setTimeout(() => scale.set(1), 150);
      }
    };

    let rafId = 0;
    const throttledMouseMove = (e: Event) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        smoothMouseMove(e as MouseEvent);
        rafId = 0;
      });
    };

    const onEnter = (e: Event) => {
      const m = e as MouseEvent;
      // Jump to the entry point instead of flying in from the corner.
      cursorX.jump(m.clientX);
      cursorY.jump(m.clientY);
      setInside(true);
    };
    const onLeave = () => setInside(false);

    const styleTarget = scope ?? document.body;
    styleTarget.style.cursor = "none";
    target.addEventListener("mousemove", throttledMouseMove);
    if (scope) {
      scope.addEventListener("mouseenter", onEnter);
      scope.addEventListener("mouseleave", onLeave);
    }

    return () => {
      target.removeEventListener("mousemove", throttledMouseMove);
      if (scope) {
        scope.removeEventListener("mouseenter", onEnter);
        scope.removeEventListener("mouseleave", onLeave);
      }
      styleTarget.style.cursor = "";
      window.clearTimeout(timeout);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [scope, cursorX, cursorY, rotation, scale]);

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        left: cursorX,
        top: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        rotate: rotation,
        scale: scale,
        zIndex: 100,
        pointerEvents: "none",
        willChange: "transform",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: inside ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      {cursor}
    </motion.div>
  );
}
