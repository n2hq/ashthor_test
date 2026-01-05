import React, { useEffect, useState } from 'react'
import { FiRotateCw } from 'react-icons/fi'
import { MdRotate90DegreesCw } from 'react-icons/md'
import { TbRotateClockwise2 } from 'react-icons/tb'
import { config } from '~/lib/lib'


export interface LoadingProp {
    loading?: boolean
}
const LoadingMessage = ({ loading }: LoadingProp) => {
    const [spin, startSpin] = useState(true)

    useEffect(() => {
        if (loading) {
            startSpin(true)
        }
    }, [loading])

    useEffect(() => {
        const handleStopSpin = async (loading: boolean | undefined) => {


            setTimeout(() => {
                startSpin(false)
            }, 3000)

        }
        if (!loading) {
            handleStopSpin(loading)
        }
    }, [loading])

    return (
        <>
            <div
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="text-lg">

                    <div style={{ marginBottom: '0px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '0.5em' }}>
                        <div className='spinner'></div>

                        <b style={{ fontFamily: 'arial', fontSize: '13px', fontWeight: 'bold', textTransform: 'lowercase' }}>{config.SITENAME}</b>
                    </div>


                </div>
            </div>
        </>
    )
}

export default LoadingMessage
