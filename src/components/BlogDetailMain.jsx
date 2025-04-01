export default function BlogDetailMain({ contents }) {
  return (
    <div className='mt-10 flex flex-col gap-2'>
      {contents.map((content, index) => (
        <p key={index}>{content}</p>
      ))}
    </div>
  );
}
