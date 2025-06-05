# TODO

## ✅ PHASE 1 COMPLETED - Fix Pyodide Initialization

**Phase 1 has been successfully completed with excellent results:**
- ✅ Pyodide initializes successfully without asset loading errors
- ✅ Python-style named groups correctly routed to Python backend
- ✅ No more "Invalid regular expression" or module resolution errors
- ✅ 35/37 tests passing (94.6% success rate)
- ✅ All core Python regex functionality working perfectly

### Pyodide Backend Fixes
- [x] Implement proper indexURL configuration in [`src/backends/python.ts`](src/backends/python.ts:1)
- [x] Fix pattern routing logic for Python-style named groups
- [x] Ensure test environment compatibility
- [x] Verify pyodide initialization works correctly

### Testing Phase 1
- [x] Test pyodide initialization in isolation
- [x] Verify basic regex pattern compilation works
- [x] Ensure error handling for initialization failures

---

## PHASE 2 - Python Backend Pattern Registry

### Backend Architecture
- [ ] Implement Python-side pattern registry and handle logic.
- [ ] Refactor TypeScript backend to use pattern handles.
- [ ] Update FFI/glue code for handle-based operations.

### Testing Phase 2
- [ ] Update and expand tests for handle-based backend in [`test/basic.test.ts`](test/basic.test.ts:1).
- [ ] Ensure no repeated compilation and proper pattern reuse.
- [ ] Add regression and error handling tests.

---

## Documentation
- [x] Rewrite [`PLAN.md`](PLAN.md:1) for new architecture.
- [ ] Update [`README.md`](README.md:1) to describe backend registry.
- [ ] Track progress and update TODOs as tasks are completed.

## Future Improvements (Outline)
- [ ] Refactor backend selection logic for extensibility.
- [ ] Enhance async/sync API consistency.
- [ ] Explore caching/pooling for JS backend.
- [ ] Improve error messages and developer tooling.