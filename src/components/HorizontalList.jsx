import './HorizontalList.css';
const HorizontalList = ({ items, renderItem, width }) => {
  return (
    <div className={`w-full md:w-${width} custom-shade`}>
      <div className='flex overflow-x-auto items-start space-x-8 custom-list-scrollbar'>
        {items?.map((item, key) => (
          <div key={key}>{renderItem(item)}</div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalList;
