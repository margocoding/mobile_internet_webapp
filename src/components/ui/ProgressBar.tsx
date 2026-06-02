interface ProgressBarProps {
    value: number;
}

const ProgressBar = ({value}: ProgressBarProps) => {
    return (
        <div className="w-full h-3 bg-[#F3F3F3] rounded-full overflow-hidden">
            <div
                className="h-full bg-[#F8AA37] rounded-full transition-all"
                style={{width: `${value}%`}}
            />
        </div>
    );
};

export default ProgressBar;