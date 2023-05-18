
function PageContent({ title, children }) {
  return (
    <div>
      <h4>{title}</h4>
      {children}
    </div>
  );
}

export default PageContent;
