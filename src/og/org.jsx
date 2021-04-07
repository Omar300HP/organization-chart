import React from "react";
import "./org.scss";
function OrgTwo() {
  return (
    <div>
      <div class="container">
        <h1 class="level-1 rectangle">head</h1>
        <ol class="level-2-wrapper">
          <li>
            <h2 class="level-2 rectangle">small head</h2>
            <ol class="level-3-wrapper">
              <li>
                <h3 class="level-3 rectangle">more smaller</h3>
                <ol class="level-4-wrapper">
                  <li>
                    <h4 class="level-4 rectangle">Person A</h4>
                  </li>
                  <li>
                    <h4 class="level-4 rectangle">Person B</h4>
                  </li>
                  <li>
                    <h4 class="level-4 rectangle">Person C</h4>
                  </li>
                  <li>
                    <h4 class="level-4 rectangle">Person D</h4>
                  </li>
                </ol>
              </li>
              <li>
                <h3 class="level-3 rectangle">more smaller</h3>
                <ol class="level-4-wrapper">
                  <li>
                    <h4 class="level-4 rectangle">Person A</h4>
                  </li>
                  <li>
                    <h4 class="level-4 rectangle">Person B</h4>
                  </li>
                  <li>
                    <h4 class="level-4 rectangle">Person C</h4>
                  </li>
                  <li>
                    <h4 class="level-4 rectangle">Person D</h4>
                  </li>
                </ol>
              </li>
            </ol>
          </li>
          <li>
            <h2 class="level-2 rectangle">small head</h2>
            <ol class="level-3-wrapper">
              <li>
                <h3 class="level-3 rectangle">more smaller</h3>
                <ol class="level-4-wrapper">
                  <li>
                    <h4 class="level-4 rectangle">Person A</h4>
                  </li>
                  <li>
                    <h4 class="level-4 rectangle">Person B</h4>
                  </li>
                  <li>
                    <h4 class="level-4 rectangle">Person C</h4>
                  </li>
                  <li>
                    <h4 class="level-4 rectangle">Person D</h4>
                  </li>
                </ol>
              </li>
              <li>
                <h3 class="level-3 rectangle">more smaller</h3>
                <ol class="level-4-wrapper">
                  <li>
                    <h4 class="level-4 rectangle">Person A</h4>
                  </li>
                  <li>
                    <h4 class="level-4 rectangle">Person B</h4>
                  </li>
                  <li>
                    <h4 class="level-4 rectangle">Person C</h4>
                  </li>
                  <li>
                    <h4 class="level-4 rectangle">Person D</h4>
                  </li>
                </ol>
              </li>
            </ol>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default OrgTwo;

function gg() {
  return (
    <div>
      <h1 class="level-1 rectangle">head</h1>
      <ol class="level-2-wrapper">
        <li>
          <h2>node1</h2>
          <ol>
            <li>
              node2
              <ol>
                <li></li>
              </ol>
            </li>
            <li>node2</li>
          </ol>
        </li>
        <li>node1</li>
      </ol>
    </div>
  );
}
