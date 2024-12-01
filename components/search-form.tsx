import React from 'react';
import Form from "next/form";
import SearchFormReset from "@/components/search-form-reset";
import {Search} from "lucide-react";

const SearchForm = ({query}: { query?: string }) => {


  return (
    <Form action={'/'} scroll={false} className={'search-form'}>
      <input className={'search-input'}
             name={'query'}
             defaultValue={query}
             placeholder={'Search Startup'}/>
      <div className={'flex gap-2'}>
        {query && <SearchFormReset/>}
        <button type={'submit'} className={'search-btn text-white'}>
          <Search className={'size-5'}/>
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
