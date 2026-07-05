'use client'
import { useRef, useEffect } from 'react'

export function useKeyboardControls(gl) {
    const keys = useRef({ forward: false, backward: false, left: false, right: false })
    const mouse = useRef({ x: 0, y: 0 })
    const isLocked = useRef(false)

    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.code === 'KeyW') keys.current.forward = true
            if (e.code === 'KeyS') keys.current.backward = true
            if (e.code === 'KeyA') keys.current.left = true
            if (e.code === 'KeyD') keys.current.right = true
        }

        const onKeyUp = (e) => {
            if (e.code === 'KeyW') keys.current.forward = false
            if (e.code === 'KeyS') keys.current.backward = false
            if (e.code === 'KeyA') keys.current.left = false
            if (e.code === 'KeyD') keys.current.right = false
        }

        const onMouseMove = (e) => {
            if (isLocked.current) {
                mouse.current.x = e.movementX
                mouse.current.y = e.movementY
            }
        }

        const onPointerLockChange = () => {
            isLocked.current = document.pointerLockElement === gl.domElement
        }

        const onClick = () => {
            gl.domElement.requestPointerLock()
        }

        document.addEventListener('keydown', onKeyDown)
        document.addEventListener('keyup', onKeyUp)
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('pointerlockchange', onPointerLockChange)
        gl.domElement.addEventListener('click', onClick)

        return () => {
            document.removeEventListener('keydown', onKeyDown)
            document.removeEventListener('keyup', onKeyUp)
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('pointerlockchange', onPointerLockChange)
            gl.domElement.removeEventListener('click', onClick)
        }
    }, [gl])

    return { keys, mouse, isLocked }
}