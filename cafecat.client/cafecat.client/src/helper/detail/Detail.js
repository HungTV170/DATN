import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApiServices } from '../../services/Api-services';
import Loading from '../../components/public-component/loading';
import Error from '../../components/public-component/ErrorComponents';


const Detail = ({ options, renderChild }) => {
  const { id } = useParams(); 
  const { UpdateById, GetById, apiData, error, loading } = useApiServices(options.url, options.transformCustomerData);
  const [localApiData, setLocalApiData] = useState(null);

  useEffect(() => {
    GetById(id);
  }, [id]);

  useEffect(() => {
    setLocalApiData(apiData);
  }, [apiData]);

  const formOptions = options.formOpt;

  const handleApiDataChange = (newData) => {
    setLocalApiData(newData);
  };

  const data = {
    formOptions: formOptions,
    handleApiDataChange: handleApiDataChange,
    UpdateById: UpdateById,
    localApiData: localApiData
  };

  if (error) {
    return <Error message={error}/>
  }

  if (loading) {
    return <Loading />;
  }

  if (!localApiData) {
    return <Loading />;
  }

  return (
    <>
      {renderChild && renderChild(data)}
    </>
  );
};

export default Detail;
