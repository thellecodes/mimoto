import React from 'react';

const NumberOverview = () => {
  const metrics = [
    { title: 'Token value', value: '4339 XLM'},
    { title: 'Total transactions', value: '38'},
    { title: 'Views through social connections', value: '452'},
  ];

  return (
    <div className="container mt-8">
      <div className="row flex-container">
        {metrics.map((metric, index) => (
          <div key={index} className="col-md-4 metric-item">
            <div className="p-2">
              <h6 className="text-sm font-bold text-gray-500">{metric.title}</h6>
              <div className="text-4xl font-bold">{metric.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NumberOverview;