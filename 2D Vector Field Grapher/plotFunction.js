function plotFunction() {
    // 获取输入的函数
    var uInput = document
      .getElementById("uInput")
      .value.replace(/sin|cos|tan|log|exp|sqrt/g, "Math.$&");
    var vInput = document
      .getElementById("vInput")
      .value.replace(/sin|cos|tan|log|exp|sqrt/g, "Math.$&");

    // 获取x, y的范围和步长，以及每个向量的sizeref
    var range = document
      .getElementById("rangeInput")
      .value.split(",")
      .map(Number);
    var step = Number(document.getElementById("stepInput").value);
    var sizeref = Number(document.getElementById("sizerefInput").value);

    // 创建一个新的函数
    var uFunc = new Function("x", "y", "return " + uInput);
    var vFunc = new Function("x", "y", "return " + vInput);

    // 生成数据
    var x = [],
      y = [],
      z = [],
      u = [],
      v = [],
      w = [];
    for (var i = range[0]; i <= range[1]; i += step) {
      for (var j = range[0]; j <= range[1]; j += step) {
        x.push(i);
        y.push(j);
        z.push(0); // 将z分量设置为0
        u.push(uFunc(i, j));
        v.push(vFunc(i, j));
        w.push(0); // 将w分量设置为0
      }
    }

    data = [
        {
          type: "cone",
          x: x,
          y: y,
          z: z,
          u: u,
          v: v,
          w: w,
          sizemode: "scaled",
          sizeref: sizeref,
          colorscale: 'Blues' // 设置颜色为淡蓝色
        },
      ];

    // 创建布局
    var layout = {
      title: "函数图像",
      scene: {
        xaxis: { title: "X" },
        yaxis: { title: "Y" },
        zaxis: { title: "" }, // 移除z轴的标题
        camera: {
          eye: { x: 0, y: 0, z: 1 }, // 将视角固定在z = 0的平面
          up: { x: 0, y: 1, z: 0 } // 确保y在纵轴
        },
        dragmode: false // 禁止旋转
      },
    };

    // 绘制图像
    Plotly.newPlot("plot", data, layout);
}
