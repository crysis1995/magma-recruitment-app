type Callbacks = Array<() => Promise<void>>;

export const startupFunction = (...callbacks: Callbacks): Promise<void> =>
    new Promise((resolve, reject) => {
        Promise.all(callbacks.map((func) => func()))
            .then(() => resolve())
            .catch((err) => reject(err));
    });
