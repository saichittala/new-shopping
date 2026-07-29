import MinusIcon from "@components/icons/minus-icon";
import PlusIcon from "@components/icons/plus-icon";
import cn from "classnames";
type CounterProps = {
	quantity: number;
	onDecrement: (e: any) => void;
	onIncrement: (e: any) => void;
	disableIncrement?: boolean;
	disableDecrement?: boolean;
	variant?: "default" | "dark";
	className?: string;
};
const Counter: React.FC<CounterProps> = ({
	quantity,
	onDecrement,
	onIncrement,
	disableIncrement = false,
	disableDecrement = false,
	variant = "default",
}) => {
	const size = variant !== "dark" ? "12px" : "10px";
	return (
		<div
			className={cn("counter", {
				"counter--default": variant === "default",
				"counter--dark": variant === "dark",
			})}
		>
			<button
				onClick={onDecrement}
				className="counter__btn counter__btn--decrement"
				disabled={disableDecrement}
			>
				<MinusIcon width={size} />
			</button>

			<span className="counter__value">
				{quantity}
			</span>

			<button
				onClick={onIncrement}
				className="counter__btn counter__btn--increment"
				disabled={disableIncrement}
			>
				<PlusIcon width={size} height={size} />
			</button>
		</div>
	);
};
export default Counter;
