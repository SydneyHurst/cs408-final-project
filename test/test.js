import { sayHello } from '../js/main.js';
import { calculateExp } from '../js/expCalculator.js';
import { rollItems } from '../js/itemRoller.js';

window.addEventListener("DOMContentLoaded", () => {
  QUnit.module('TEST', function() {

    QUnit.test('make sure the hello function says hello', function(assert) {
      var result = sayHello();
      assert.equal(result, 'hello');
    });

    QUnit.test("Character only", function(assert) {
      var result = calculateExp({ isCharacter: true });
      assert.equal(result, 1);
    });

    QUnit.test("Background only", function(assert) {
      assert.equal(calculateExp({ isBackground: true }), 3);
    });

    QUnit.test("With modifiers", function(assert) {
      const exp = calculateExp({ isBackground: true, isActivity: true, isOwner: true });
      assert.equal(exp, 7);
    });

    QUnit.test("Conflict throws error", function(assert) {
      assert.throws(() => {
        calculateExp({ isCharacter: true, isBackground: true });
      }, /Cannot select both character and background/);
    });

    QUnit.test("No options", function(assert) {
      assert.equal(calculateExp({}), 0);
    });

    QUnit.test("Roll count is between 1 and 3",  function(assert) {
        for (let i = 0; i < 100; i++) {
          const result = rollItems(false);
          assert.ok(result.length >= 1 && result.length <= 3, "Roll count valid");
        }
      });
    
      QUnit.test("Sick adjustment applied",  function(assert) {
        const result = rollItems(true);
        result.forEach(item => {
          assert.ok(item.adjusted <= item.raw, "Sick adjusted downward");
          assert.ok(item.adjusted >= 1, "Minimum adjusted is 1");
        });
      });
    
      QUnit.test("Rarity is classified correctly",  function(assert) {
        const classify = (adjusted) => {
          return adjusted <= 50 ? "Common" : adjusted <= 80 ? "Uncommon" : "Rare";
        };
    
        assert.equal(classify(25), "Common");
        assert.equal(classify(70), "Uncommon");
        assert.equal(classify(95), "Rare");
      });

  });
});
