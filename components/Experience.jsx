'use client'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Player } from './Player'
import { Ground } from './Ground'

export default function Experience() {
    return (
        <Canvas
            camera={{ fov: 45, position: [0, 2, 5] }}
            style={{ background: '#111' }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

            <Physics>
                <Player />
                <Ground />
            </Physics>
        </Canvas>
    )
}