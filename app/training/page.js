import { redirect } from 'next/navigation.js';

import { verifyAuthSession } from '@/lib/lucia-auth.js';
import { getTrainings } from '@/lib/training';

export default async function TrainingPage() {
  const auth = await verifyAuthSession();

  if (!auth.user) {
    return redirect('/');
  }

  const trainingSessions = getTrainings();

  return (
    <main>
      <h1>Find your favorite activity</h1>
      <ul id="training-sessions">
        {trainingSessions.map((training) => (
          <li key={training.id}>
            <img src={`/trainings/${training.image}`} alt={training.title} />
            <div>
              <h2>{training.title}</h2>
              <p>{training.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
