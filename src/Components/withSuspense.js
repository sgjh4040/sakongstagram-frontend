import React, { Suspense } from "react";

export default function withSuspense(Component) {
    return class extends React.Component {
        render() {
            return (
                <Suspense
                    fallback={
                        <div>loading</div>
                    }
                >
                    <Component/>
                </Suspense>
            );
        }
    };
}
