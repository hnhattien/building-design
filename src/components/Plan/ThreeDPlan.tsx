import { Canvas } from '@react-three/fiber';
import { FunctionComponent } from 'react';

const ThreeDPlan: FunctionComponent<Plan.ThreeDPlanProps> = (props) => {
    return (
        <div className="3d-container">
            <Canvas>
                <ambientLight intensity={0.1} />
                <directionalLight color="red" position={[0, 0, 5]} />
                <mesh>
                    <boxGeometry />
                    <meshStandardMaterial />
                </mesh>
            </Canvas>
        </div>
    );
};

export default ThreeDPlan;
