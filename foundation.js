// const _data = [1,2,3,4];
// const el = d3.select("#data").selectAll("li")
//     .data(_data)
//     .join(
//         enter => {
//             return enter.append("li")
//                 .style("color", "red")
//         },
//         update => update.style("color", "blue"),
//         exit => exit.remove()
//     )
//     .text(d => d);

// console.log(el);


const _data = [1,2,3,4];
const el = d3.select("#data").selectAll("li")
    .data(_data)
    .text(d => d);

el.enter()
    .append("li");

el.exit().remove();

console.log(el);

