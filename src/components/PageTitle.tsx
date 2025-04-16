const PageTitle = ({ title }: { title: string }) => {
  return (
    <div className="page-title">
      <h2>{title}</h2>
      <div className="divider" />
    </div>
  );
};

export default PageTitle;
