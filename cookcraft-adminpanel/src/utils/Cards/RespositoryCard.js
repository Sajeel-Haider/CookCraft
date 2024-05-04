const RespositoryCard = () => {
  return (
    <div className="p-4 rounded-xl border mt-4 m-auto cursor-pointer w-9/12 ">
      <div>
        <h1 className="text-4xl ">Code Project Name</h1>
      </div>
      <div className="flex justify-around mt-4">
        <p>Last Upadated: time</p>
        <p>Number of Collaborators</p>
      </div>
    </div>
  );
};

export default RespositoryCard;
