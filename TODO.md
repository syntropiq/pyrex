# TODO

## Python Backend Pattern Registry (Immediate Objective)
- [ ] Implement Python-side pattern registry and handle logic.
- [ ] Refactor TypeScript backend to use pattern handles.
- [ ] Update FFI/glue code for handle-based operations.

## Testing
- [ ] Update and expand tests for handle-based backend in [`test/basic.test.ts`](test/basic.test.ts:1).
- [ ] Ensure no repeated compilation and proper pattern reuse.
- [ ] Add regression and error handling tests.

## Documentation
- [x] Rewrite [`PLAN.md`](PLAN.md:1) for new architecture.
- [ ] Update [`README.md`](README.md:1) to describe backend registry.
- [ ] Track progress and update TODOs as tasks are completed.

## Future Improvements (Outline)
- [ ] Refactor backend selection logic for extensibility.
- [ ] Enhance async/sync API consistency.
- [ ] Explore caching/pooling for JS backend.
- [ ] Improve error messages and developer tooling.