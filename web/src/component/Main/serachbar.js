import "./searchbar.scss";
import { AiOutlineSearch } from "react-icons/ai";

const Searchbar = () => {
  return (
    <div className="serch">
      <input
        name="keyword"
        type="search"
        placeholder="관심있는 내용을 검색해보세요!"
        autoComplete="off"
      />
      <AiOutlineSearch size="2em" />
    </div>
  );
};

export default Searchbar;
