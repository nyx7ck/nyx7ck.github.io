function drawFunction() {
    // 获取输入的函数
    var uInput = document
      .getElementById("uInput")
      .value.replace(/sin|cos|tan|log|exp|sqrt/g, "Math.$&");
    var vInput = document
      .getElementById("vInput")
      .value.replace(/sin|cos|tan|log|exp|sqrt/g, "Math.$&");
    var wInput = document
      .getElementById("wInput")
      .value.replace(/sin|cos|tan|log|exp|sqrt/g, "Math.$&");

    // 获取x, y, z的范围和步长，以及每个向量的sizeref
    var range = document
      .getElementById("rangeInput")
      .value.split(",")
      .map(Number);
    var step = Number(document.getElementById("stepInput").value);
    var sizeref = Number(document.getElementById("sizerefInput").value);

    // 创建一个新的函数
    var uFunc = new Function("x", "y", "z", "return " + uInput);
    var vFunc = new Function("x", "y", "z", "return " + vInput);
    var wFunc = new Function("x", "y", "z", "return " + wInput);

    // 生成数据
    var x = [],
      y = [],
      z = [],
      u = [],
      v = [],
      w = [];
    for (var i = range[0]; i <= range[1]; i += step) {
      for (var j = range[0]; j <= range[1]; j += step) {
        for (var k = range[0]; k <= range[1]; k += step) {
          x.push(i);
          y.push(j);
          z.push(k);
          u.push(uFunc(i, j, k));
          v.push(vFunc(i, j, k));
          w.push(wFunc(i, j, k));
        }
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
        },
      ];

    // 创建布局
    var layout = {
      title: "函数图像",
      scene: {
        xaxis: { title: "X" },
        yaxis: { title: "Y" },
        zaxis: { title: "Z" },
      },
    };

    // 绘制图像
    Plotly.newPlot("plot", data, layout);
  }