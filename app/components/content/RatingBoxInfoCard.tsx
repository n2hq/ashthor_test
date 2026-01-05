type RatingBoxProps = {
    rating: number
}

export default function RatingBoxInfoCard({ rating }: RatingBoxProps) {
    // Single star SVG path
    const starPath = "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"

    return (
        <div className="flex gap-x-[0px]">
            {Array.from({ length: 5 }).map((_, i) => {
                const fillPercent = Math.max(0, Math.min(1, rating - i)) * 100

                return (
                    <div key={i} className={`relative w-[20px] h-[20px] -top-[1.2px] flex gap-3`}>
                        {/* Gray background star */}
                        <svg width="30" height="30" viewBox="0 0 35 35" className="absolute">
                            <path d={starPath} fill="#d1d5db" />
                        </svg>

                        {/* Orange overlay (clipped to percentage) */}
                        <div className="absolute overflow-hidden" style={{ width: `${fillPercent}%` }}>
                            <svg width="30" height="30" viewBox="0 0 35 35">
                                <path d={starPath} fill="#FFA500" />
                            </svg>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}