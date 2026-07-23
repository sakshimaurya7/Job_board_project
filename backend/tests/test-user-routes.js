import assert from 'assert';
import app from '../index.js';
import userRoutes from '../routes/user.routes.js';

function runRouteTests() {
  console.log('--- Starting JobSphere User API Routes Unit Tests ---\n');

  let passed = 0;
  let failed = 0;

  function recordTest(name, fn) {
    try {
      fn();
      console.log(`✅ [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`❌ [FAIL] ${name}`);
      console.error(err);
      failed++;
    }
  }

  recordTest('Routes: User router is properly defined and mounted', () => {
    assert.ok(userRoutes, 'userRoutes should be defined');
    assert.strictEqual(typeof userRoutes, 'function', 'userRoutes should be an Express Router function');
  });

  recordTest('Routes: Inspect registered routes on user router', () => {
    const registeredRoutes = userRoutes.stack
      .filter(layer => layer.route)
      .map(layer => ({
        path: layer.route.path,
        methods: Object.keys(layer.route.methods),
      }));

    const expectedEndpoints = [
      { path: '/register', method: 'post' },
      { path: '/login', method: 'post' },
      { path: '/logout', method: 'get' },
      { path: '/password/forgot', method: 'post' },
      { path: '/password/reset/:token', method: 'post' },
      { path: '/profile', method: 'get' },
      { path: '/profile/update', method: 'put' },
      { path: '/admin/status/:userId', method: 'put' },
    ];

    for (const expected of expectedEndpoints) {
      const match = registeredRoutes.find(
        r => r.path === expected.path && r.methods.includes(expected.method)
      );
      assert.ok(
        match,
        `Route ${expected.method.toUpperCase()} /api/v1/user${expected.path} should be registered`
      );
    }
  });

  console.log(`\n-----------------------------------`);
  console.log(`Route Test Results: ${passed} Passed, ${failed} Failed`);
  console.log(`-----------------------------------\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runRouteTests();
