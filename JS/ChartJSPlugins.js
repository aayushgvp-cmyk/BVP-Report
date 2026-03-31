const chartTotalPlugin = {
  id: 'chartTotalPlugin',
  // Runs after the chart is drawn
  afterDraw: (chart) => {
    const { ctx, data, chartArea: { top, left, width } } = chart;
    
    // Calculate total from all datasets
    const total = data.datasets.reduce((acc, dataset) => {
      return acc + dataset.data.reduce((a, b) => a + (Number(b) || 0), 0);
    }, 0);

    // Canvas drawing settings
    ctx.save();
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    
    // Draw the text slightly above the chart area
    ctx.fillText(`Total: ${total.toLocaleString()}`, left + width-90, top+15);
    ctx.restore();
  }
};

const pieLabelsPlugin = {
  id: 'pieLabels',
  afterDatasetsDraw(chart) {
    const { ctx, data } = chart;
    const meta = chart.getDatasetMeta(0);
    const dataset = data.datasets[0];
    
    // Calculate Total dynamically to fix the C2Sum error
    const total = dataset.data.reduce((acc, val) => acc + (Number(val) || 0), 0);
    
    const center = { x: meta.data[0].x, y: meta.data[0].y };
    const minSpacing = 16;
    const labelOffset = 40; // Distance from pie edge

    ctx.save();
    ctx.font = 'bold 10px sans-serif';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#999';

    const points = meta.data.map((datapoint, index) => {
      const { startAngle, endAngle, outerRadius } = datapoint;
      const midAngle = startAngle + (endAngle - startAngle) / 2;
      return {
        index,
        midAngle,
        outerRadius,
        isRight: Math.cos(midAngle) > 0,
        // Initial Y based on the angle
        y: center.y + Math.sin(midAngle) * (outerRadius + labelOffset)
      };
    });

    [true, false].forEach(isRight => {
      const sidePoints = points
        .filter(p => p.isRight === isRight)
        .sort((a, b) => a.y - b.y);

      // Prevent vertical overlap
      for (let i = 1; i < sidePoints.length; i++) {
        if (sidePoints[i].y - sidePoints[i - 1].y < minSpacing) {
          sidePoints[i].y = sidePoints[i - 1].y + minSpacing;
        }
      }

      sidePoints.forEach(p => {
        const { midAngle, outerRadius, y: finalY, index } = p;
        const val = dataset.data[index];
        const percentage = total > 0 ? ((val / total) * 100).toFixed(1) : 0;
        
        const labelX = center.x + Math.cos(midAngle) * (outerRadius + labelOffset);
        const edgeX = center.x + Math.cos(midAngle) * outerRadius;
        const edgeY = center.y + Math.sin(midAngle) * outerRadius;

        // Draw Connector Lines
        ctx.beginPath();
        ctx.moveTo(edgeX, edgeY);
        ctx.lineTo(labelX, finalY);
        ctx.lineTo(isRight ? labelX + 10 : labelX - 10, finalY);
        ctx.stroke();

        // Draw Text
        ctx.textAlign = isRight ? 'left' : 'right';
        ctx.fillStyle = '#000';
        const textX = isRight ? labelX + 15 : labelX - 15;
        const labelText = `${data.labels[index]}: ${Math.floor(val / 1000)}K (${percentage}%)`;
        ctx.fillText(labelText, textX, finalY);
	ctx.fillText(labelText, textX, finalY);
	ctx.fillText(labelText, textX, finalY);

      });
    });

    ctx.restore();
  }
};




const topLabelsPlugin = {id: 'topLabels',afterDatasetsDraw(chart) {const { ctx, data } = chart;ctx.save();ctx.textAlign = 'center';ctx.textBaseline = 'bottom';ctx.font = 'bold 12px sans-serif';ctx.fillStyle = '#000';chart.getDatasetMeta(0).data.forEach((bar, index) => {ctx.fillText((data.datasets[0].data[index]>1000)?(Math.floor(data.datasets[0].data[index]/1000)+"K"):(Math.floor(data.datasets[0].data[index])), bar.x, bar.y - 5); });ctx.restore();}};




const topLabelsPluginK = {
  id: 'topLabels',
  afterDatasetsDraw(chart) {
    const { ctx, data } = chart;
    const dataset = data.datasets[0];
    const total = dataset.data.reduce((acc, val) => acc + val, 0);

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#000';

    chart.getDatasetMeta(0).data.forEach((bar, index) => {
      const value = dataset.data[index];
      const percent = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
      const formattedValue = value >= 1000 ? `${Math.floor(value / 1000)}K` : value;

      // Draw Value (Top line, moved higher)
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(formattedValue, bar.x, bar.y - 20); 
      
      // Draw Percentage (Bottom line, moved higher)
      ctx.font = 'normal 11px sans-serif';
      ctx.fillText(`(${percent}%)`, bar.x, bar.y - 5);
    });

    ctx.restore();
  }
};
