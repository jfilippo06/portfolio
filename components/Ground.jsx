'use client'
import { RigidBody } from '@react-three/rapier'

export function Ground() {
    return (
        <RigidBody type="fixed">
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
                <planeGeometry args={[30, 30]} />
                <meshStandardMaterial color="#61c45aff" />
            </mesh>
        </RigidBody>
    )
}