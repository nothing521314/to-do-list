function Search(props) {
  const { handleSearch } = props;

  const handleSearchTerm = (e) => {
    const value = e.target.value;
    handleSearch(value);
  }

  return (
    <input
      type="text"
      className="form-control search"
      placeholder="Search..."
      onChange={handleSearchTerm}
    />
  );
}

export default Search;