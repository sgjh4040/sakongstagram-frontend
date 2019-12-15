import React, {useEffect} from "react";
import { withRouter } from "react-router-dom";
import SearchPresenter from "./SearchPresenter";
import { useQuery } from "react-apollo-hooks";
import { SEARCH } from "./SearchQueries";

export default withRouter(({ location: { search } }) => {
  console.log(search);
  const term = search.split("=")[1];
  console.log("term",term);
  const { data, loading,refetch } = useQuery(SEARCH, {
    skip: term === undefined,
    variables: {
      term
    }
  });
  console.log(data);
  useEffect(()=>{
    refetch();
  },[data])


  return <SearchPresenter searchTerm={term} loading={loading} data={data} />;
});