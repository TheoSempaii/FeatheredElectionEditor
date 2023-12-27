
const applyAttribute = {
  content: `<div class="renderedEffect">
  <div class="input-group mb-3">
    <span class="input-group-text">Operation</span>
    <select class="form-select" id="operationID">
      <option value="SUM">Sum</option>
      <option value="PERCENT_ADD">Percent Add</option>
      <option value="MULTIPLY">Multiply</option>
      <option value="REST">Subtract</option>
    </select>
  </div>

  <div class="input-group mb-3">
    <span class="input-group-text">Modifier</span>
    <select class="form-select" id="modifierID">
      <option value="GENERIC_ARMOR">Armor</option>
      <option value="GENERIC_ARMOR_TOUGHNESS">Armor Toughness</option>
      <option value="GENERIC_ATTACK_DAMAGE">Attack Damage</option>
      <option value="GENERIC_ATTACK_KNOCKBACK">Attack Knockback</option>
      <option value="GENERIC_ATTACK_SPEED">Attack Speed</option>
      <option value="GENERIC_FLYING_SPEED">Flying Speed</option>
      <option value="GENERIC_FOLLOW_RANGE">Follow Range</option>
      <option value="GENERIC_KNOCKBACK_RESISTANCE">Knockback Resistance</option>
      <option value="GENERIC_LUCK">Luck</option>
      <option value="GENERIC_MAX_ABSORPTION">Max Absorption</option>
      <option value="GENERIC_MAX_HEALTH">Max Health</option>
      <option value="GENERIC_MOVEMENT_SPEED">Movement Speed</option>
      <option value="HORSE_JUMP_STRENGTH">Horse Jump Strength</option>
      <option value="ZOMBIE_SPAWN_REINFORCEMENTS">Zombie Spawn Reinforcements</option>


    </select>
  </div>



  <div class="input-group mb-3">
    <span class="input-group-text">Value (Number)</span>
    <input type="number" class="form-control" id="val">
  </div>

  <textarea cols="30" rows="5" id="finalJSON"></textarea>
</div>
`,
  execute: () => {
    const modifier = document.getElementById("modifierID")
    const multiplier = document.getElementById("val")
    const operation = document.getElementById("operationID")
    const finalJSON = document.getElementById("finalJSON")

    modifier.onchange = () => modifyJSON()
    multiplier.onchange = () => modifyJSON()
    operation.onchange = () => modifyJSON()


    function modifyJSON() {
      fetch("/yaml", {
        method: "POST",
        body: JSON.stringify({
          "id": "apply_attribute",
          "args": {
            "modifiers": [
              `${modifier.value}:${multiplier.value || 0}`
            ],
            "operation": operation.value
          }
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(V => V.json().then(j => finalJSON.value = j.response))


    }
  }

}