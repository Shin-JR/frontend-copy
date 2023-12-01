
export default function Cell ({ onClick, className, children }) {
    return (
        <div onClick={onClick} className={className}>
            { children }
        </div>
    );
};
