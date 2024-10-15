import styles from "./Options.module.css";
import { BsEmojiGrin, BsEmojiFrown, BsEmojiNeutral } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";

const Options = ({ onLeaveFeedback, onReset, totalFeedback }) => {
  return (
    <div className={styles.optionsBox}>
      <button
        className={styles.optionsBnt}
        onClick={() => onLeaveFeedback(`good`)}
      >
        Good <BsEmojiGrin />
      </button>
      <button
        className={styles.optionsBnt}
        onClick={() => onLeaveFeedback(`neutral`)}
      >
        Neutral <BsEmojiNeutral />
      </button>
      <button
        className={styles.optionsBnt}
        onClick={() => onLeaveFeedback(`bad`)}
      >
        Bad <BsEmojiFrown />
      </button>
      {totalFeedback > 0 && (
        <button
          className={styles.optionsBnt}
          onClick={() => onReset(`resetFeedback`)}
        >
          Reset <GrPowerReset />
        </button>
      )}
    </div>
  );
};

export default Options;
