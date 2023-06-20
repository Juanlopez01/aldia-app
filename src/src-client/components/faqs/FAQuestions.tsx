import { useToggle } from "@/src-client/hooks/use-toggle";
import { QuestionType } from "@/types/general.types";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const FAQuestion = ({ question, solution, extra }: QuestionType) => {
	const { toggle, toggleHandler } = useToggle(false);
	return (
		<>
			<article className="text-center m-2 shadow shadow-darkest-blue p-4 flex flex-col gap-2
      max-w-full">
        <button onClick={toggleHandler} className="flex justify-between">
          <h3 className="text-medium-blue text-xl font-semibold text-center m-0">
            {question}
          </h3>
          <FontAwesomeIcon icon={!toggle ? faMinusCircle : faPlusCircle} className="cursor-pointer p-1 text-medium-blue text-xl"/>
        </button>
				{toggle && (
					<div className="max-w-[500px]">
						<p>{solution}</p>
						{extra && <footer>{extra}</footer>}
					</div>
				)}
			</article>
		</>
	);
};
