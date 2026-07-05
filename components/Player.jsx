'use client'
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { useKeyboardControls } from '../hooks/useKeyboardControls'
import * as THREE from 'three'

export function Player() {
    const bodyRef = useRef()
    const { camera, gl } = useThree()
    const { keys, mouse, isLocked } = useKeyboardControls(gl)

    useFrame(() => {
        if (!bodyRef.current) return

        const pos = bodyRef.current.translation()
        camera.position.set(pos.x, pos.y + 1.6, pos.z)

        // Rotar solo si el cursor está bloqueado
        if (isLocked.current) {
            camera.rotation.y -= mouse.current.x * 0.002
            camera.rotation.x -= mouse.current.y * 0.002
            camera.rotation.x = Math.max(-1, Math.min(1, camera.rotation.x))
        }

        mouse.current.x = 0
        mouse.current.y = 0

        // Movimiento
        const speed = 5
        const dir = new THREE.Vector3()

        const forward = new THREE.Vector3()
        camera.getWorldDirection(forward)
        forward.y = 0
        forward.normalize()

        const right = new THREE.Vector3()
        right.crossVectors(camera.up, forward).normalize()

        if (keys.current.forward) dir.add(forward)
        if (keys.current.backward) dir.sub(forward)
        if (keys.current.left) dir.add(right)
        if (keys.current.right) dir.sub(right)

        if (dir.length() > 0) {
            dir.normalize()
            bodyRef.current.setLinvel({
                x: dir.x * speed,
                y: bodyRef.current.linvel().y,
                z: dir.z * speed
            }, true)
        } else {
            bodyRef.current.setLinvel({
                x: 0,
                y: bodyRef.current.linvel().y,
                z: 0
            }, true)
        }
    })

    return (
        <RigidBody ref={bodyRef} colliders="ball" position={[0, 2, 0]} mass={1}>
            <mesh visible={false}>
                <sphereGeometry args={[0.5]} />
            </mesh>
        </RigidBody>
    )
}