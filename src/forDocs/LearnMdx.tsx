
const LearnMdx: React.FC<{ category: string | null; fileName: string | undefined}> = ({ category, fileName }) => {
  return (
    <div>
      <h1>Learn {category}</h1>
      <h2>{fileName}</h2>
    </div>
  );
};

export default LearnMdx;