import { useEffect, useState } from "react";
import "./OrgChart.scss";

function OrgChart(props) {
  const { chartData, onChange } = props;
  const colors = ["#8dccad", "#f5cc7f"];
  const [draggedNode, setDraggedNode] = useState(null);
  const [nodeDragFinish, setNodeDragFinish] = useState(false); // true when dragged node is just dropped
  const [nodeIsOnDragSpace, setNodeIsOnDragSpace] = useState(false);

  const resetDragStates = () => {
    setDraggedNode(null);
    setNodeDragFinish(false);
    setNodeIsOnDragSpace(false);
  };

  const handelDelete = (indexs) => {
    let chartDataDeleting = { ...chartData };
    let removedNode = [...chartDataDeleting.children];

    let currentNode = indexs.pop();

    let parentNode = indexs.pop();

    indexs.forEach((p) => {
      removedNode = removedNode[p].children;
    });
    if (removedNode[parentNode]) {
      // removing from an ordinary node
      removedNode[parentNode].children.splice(currentNode, 1);
    } else {
      // removing from the head children
      removedNode.splice(currentNode, 1);
      chartDataDeleting.children = removedNode;
    }
    onChange({ target: { value: { ...chartDataDeleting } } });
  };
  const handelAdd = (indexs) => {
    let chartDataAdding = { ...chartData };
    let addNode = [...chartDataAdding.children];
    let currentNode = indexs.pop();

    indexs.forEach((p) => {
      addNode = addNode[p].children;
    });

    addNode[currentNode].children =
      addNode[currentNode].children && addNode[currentNode].children.length > 0
        ? [
            ...addNode[currentNode].children,
            {
              arabicLabel: "[جديد]",
              englishLabel: "new",
              id: 10,
              children: [],
            },
          ]
        : [
            {
              arabicLabel: "[جديد]",
              englishLabel: "new",
              id: 10,
              children: [],
            },
          ];
    onChange({ target: { value: { ...chartDataAdding } } });
  };

  useEffect(() => {
    if (
      draggedNode &&
      nodeIsOnDragSpace &&
      nodeDragFinish &&
      JSON.stringify(draggedNode.indexs) !==
        JSON.stringify(nodeIsOnDragSpace.indexs) &&
      !JSON.stringify(nodeIsOnDragSpace.indexs).includes(
        JSON.stringify(draggedNode.indexs).replace("]", "")
      ) &&
      JSON.stringify(draggedNode.indexs.slice(0, -1)) !==
        JSON.stringify(nodeIsOnDragSpace.indexs)
    ) {
      // dragged node is inside the node key of draggedNode state
      // and the indexs is an array indicating the position of the node in the chart data
      let _actualDraggedNode = { ...draggedNode.node };
      let draggedNodeIndexs = [...draggedNode.indexs];

      // drop node is inside the node key of nodeIsOnDragSpace state
      // and the indexs is an array indicating the position of the node in the chart data
      let _actualdroppedNode = { ...nodeIsOnDragSpace.node };
      let droppedNodeIndexs = Array.isArray(nodeIsOnDragSpace.indexs)
        ? [...nodeIsOnDragSpace.indexs]
        : nodeIsOnDragSpace.indexs;

      // copying the original state
      let _chartData = { ...chartData };

      let new_node = [..._chartData.children];
      // putting the node inside the children of the drop node

      // special condition for inserting in head
      if (droppedNodeIndexs === "head") {
        _chartData.children = [..._chartData.children, _actualDraggedNode];
      } else {
        let last_new = droppedNodeIndexs.pop();
        droppedNodeIndexs.forEach((p) => {
          new_node = new_node[p].children;
        });
        new_node[last_new].children = new_node[last_new].children
          ? [...new_node[last_new].children, _actualDraggedNode]
          : [_actualDraggedNode];
      }

      // remove the node from its original position
      let removed_node = [..._chartData.children];
      // putting the node inside the children of the drop node
      let b4_last_remove = draggedNodeIndexs.pop();
      let last_remove = draggedNodeIndexs.pop();
      draggedNodeIndexs.forEach((p) => {
        removed_node = removed_node[p].children;
      });
      if (removed_node[last_remove]) {
        // removing from an ordinary node
        removed_node[last_remove].children = removed_node[
          last_remove
        ].children.filter((el) => el.id !== _actualDraggedNode.id);
      } else {
        // removing from the head children
        removed_node.splice(b4_last_remove, 1);
        _chartData.children = removed_node;
      }

      onChange({ target: { value: { ..._chartData } } });
      resetDragStates();
    } else if (
      nodeIsOnDragSpace &&
      draggedNode &&
      nodeDragFinish &&
      JSON.stringify(nodeIsOnDragSpace.indexs).includes(
        JSON.stringify(draggedNode.indexs).replace("]", "")
      )
    ) {
      console.log("nodeIsOnDragSpace", nodeIsOnDragSpace);
      console.log("draggedNode", draggedNode);
      resetDragStates();
    }
  }, [draggedNode, nodeIsOnDragSpace, nodeDragFinish]);

  const recursiveRenderChart = (node, current_level, parent_index) => {
    return (
      <ol
        className={"level-wrapper"}
        style={{
          gridTemplateColumns: `repeat(${node.children?.length}, 1fr)`,
        }}
      >
        {node.children &&
          node.children.length > 0 &&
          node.children.map((child, index) => {
            let indexs =
              parent_index && parent_index.length > 0
                ? [...parent_index, index]
                : [index];
            return (
              <li
                key={index}
                className={`${
                  node.children.length > 1
                    ? index === 0
                      ? "left-hr"
                      : node.children.length === index + 1
                      ? "right-hr"
                      : "center-hr"
                    : ""
                }`}
              >
                <div
                  className={`${
                    !child.children || child.children?.length === 0
                      ? "level-no-child"
                      : "level"
                  }   rectangle
                  
                  `}
                  style={{
                    backgroundColor: current_level % 2 ? colors[0] : colors[1],
                  }}
                  draggable={true}
                  id={`node-${index}`}
                  onDrag={(e) => {
                    e.preventDefault();
                    setDraggedNode({ node: child, indexs: indexs });
                  }}
                  onDragEnd={(e) => {
                    e.preventDefault();
                    setNodeDragFinish(true);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setNodeIsOnDragSpace({ node: child, indexs: indexs });
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setNodeIsOnDragSpace(false);
                  }}
                >
                  {child.arabicLabel}/{child.englishLabel}
                  <button
                    onClick={() => {
                      handelDelete(indexs);
                    }}
                  >
                    delete
                  </button>
                  <button
                    onClick={() => {
                      handelAdd(indexs);
                    }}
                  >
                    add
                  </button>
                </div>
                {recursiveRenderChart(
                  child,
                  parseInt(current_level) + 1,
                  indexs
                )}
              </li>
            );
          })}
      </ol>
    );
  };

  const renderChart = (head) => {
    return (
      head && (
        <div className={"org-chart"}>
          <div className={`level level-1 rectangle`}>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setNodeIsOnDragSpace({ node: head, indexs: "head" });
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setNodeIsOnDragSpace(false);
              }}
            >
              {head.arabicLabel}/{head.englishLabel}
            </div>
          </div>
          {recursiveRenderChart(head, 2)}
        </div>
      )
    );
  };

  return <div className="org-chart-container">{renderChart(chartData)}</div>;
}

export default OrgChart;
