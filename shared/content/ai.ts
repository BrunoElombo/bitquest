import type { Challenge } from '../types';

// Artificial Intelligence, from "what is a model?" to transformers, RAG and hallucinations.
// Code is written in plain Python so the browser sandbox (and `npm run validate`) can run it.

export const challenges: Challenge[] = [
  // ───────────────────────────── Tier 1 — Novice ─────────────────────────────
  {
    id: 'ai-001',
    track: 'ai',
    tier: 1,
    kind: 'mcq',
    concept: { en: 'AI, ML and deep learning', fr: 'IA, ML et apprentissage profond' },
    prompt: {
      en: 'How are Artificial Intelligence, Machine Learning and Deep Learning related?',
      fr: 'Quel lien y a-t-il entre Intelligence Artificielle, Machine Learning et Deep Learning ?',
    },
    options: [
      { en: 'They are three names for exactly the same thing', fr: 'Ce sont trois noms pour exactement la même chose' },
      { en: 'Deep Learning is a kind of Machine Learning, which is one way of doing AI', fr: 'Le Deep Learning est une forme de Machine Learning, qui est une façon de faire de l’IA' },
      { en: 'Machine Learning is a kind of Deep Learning, which is a kind of AI', fr: 'Le Machine Learning est une forme de Deep Learning, qui est une forme d’IA' },
      { en: 'AI is a kind of Machine Learning that only uses robots', fr: 'L’IA est une forme de Machine Learning réservée aux robots' },
    ],
    answer: 1,
    hint: {
      en: 'Picture three nested circles. Which one is the biggest?',
      fr: 'Imagine trois cercles imbriqués. Lequel est le plus grand ?',
    },
    explanation: {
      en: 'AI is the broad goal of making machines act intelligently (rules, search, learning…). Machine Learning is the part of AI where the machine learns patterns from data instead of following hand-written rules. Deep Learning is the part of ML that uses neural networks with many layers.',
      fr: 'L’IA est l’objectif global de rendre les machines intelligentes (règles, recherche, apprentissage…). Le Machine Learning est la partie de l’IA où la machine apprend des motifs à partir de données au lieu de suivre des règles écrites à la main. Le Deep Learning est la partie du ML qui utilise des réseaux de neurones à nombreuses couches.',
    },
  },
  {
    id: 'ai-002',
    track: 'ai',
    tier: 1,
    kind: 'mcq',
    concept: { en: 'Supervised vs unsupervised', fr: 'Supervisé ou non supervisé' },
    prompt: {
      en: 'You train a spam filter on 10,000 emails, each already marked "spam" or "not spam". What kind of learning is this?',
      fr: 'Tu entraînes un filtre anti-spam sur 10 000 e-mails, chacun déjà marqué « spam » ou « pas spam ». De quel type d’apprentissage s’agit-il ?',
    },
    options: [
      { en: 'Supervised learning: every example comes with the right answer', fr: 'Apprentissage supervisé : chaque exemple est fourni avec la bonne réponse' },
      { en: 'Unsupervised learning: the model groups emails on its own', fr: 'Apprentissage non supervisé : le modèle regroupe les e-mails tout seul' },
      { en: 'Reinforcement learning: the model gets rewards for playing a game', fr: 'Apprentissage par renforcement : le modèle reçoit des récompenses en jouant' },
      { en: 'It is not learning, just a list of rules', fr: 'Ce n’est pas de l’apprentissage, juste une liste de règles' },
    ],
    answer: 0,
    hint: {
      en: 'Someone already wrote the answer next to each example. Who "supervises" the model?',
      fr: 'Quelqu’un a déjà écrit la réponse à côté de chaque exemple. Qui « supervise » le modèle ?',
    },
    explanation: {
      en: 'In supervised learning, every training example is labeled with the expected output, and the model learns to map inputs to those labels. Unsupervised learning has no labels (e.g. clustering customers), and reinforcement learning learns from rewards after actions.',
      fr: 'En apprentissage supervisé, chaque exemple d’entraînement porte une étiquette avec la sortie attendue, et le modèle apprend à associer les entrées à ces étiquettes. L’apprentissage non supervisé n’a pas d’étiquettes (ex. regrouper des clients), et l’apprentissage par renforcement apprend grâce aux récompenses reçues après ses actions.',
    },
  },
  {
    id: 'ai-003',
    track: 'ai',
    tier: 1,
    kind: 'riddle',
    concept: { en: 'Features and labels', fr: 'Caractéristiques et étiquettes' },
    prompt: {
      en: 'Size, rooms and street are what you see;\nthe price is the answer you hope to foresee.\nIn a supervised dataset I am that answer column,\nthe value the model must learn to predict.\nWhat am I called?',
      fr: 'Surface, pièces, quartier : voilà ce qu’on voit ;\nle prix est la réponse qu’on espère prédire.\nDans un jeu de données supervisé, je suis cette colonne-réponse,\nla valeur que le modèle doit apprendre à deviner.\nComment m’appelle-t-on ?',
    },
    accepted: ['label', 'labels', 'target', 'the label', 'the target', 'etiquette', 'étiquette', 'cible', 'y'],
    hint: {
      en: 'The inputs are called features. The output starts with an L (or a T).',
      fr: 'Les entrées s’appellent des caractéristiques (features). La sortie commence par un É (ou un C).',
    },
    explanation: {
      en: 'Features (often written X) are the inputs describing each example; the label or target (often y) is the value to predict. Training shows the model many (features, label) pairs so it can predict labels for new examples.',
      fr: 'Les caractéristiques (souvent notées X) sont les entrées qui décrivent chaque exemple ; l’étiquette ou cible (souvent y) est la valeur à prédire. L’entraînement montre au modèle beaucoup de paires (caractéristiques, étiquette) pour qu’il prédise l’étiquette de nouveaux exemples.',
    },
  },
  {
    id: 'ai-004',
    track: 'ai',
    tier: 1,
    kind: 'output',
    concept: { en: 'Train / test split', fr: 'Séparer entraînement et test' },
    prompt: {
      en: 'We keep the last 20% of the data aside to test the model. What does this print?',
      fr: 'On met de côté les derniers 20 % des données pour tester le modèle. Qu’affiche ce code ?',
    },
    code: `data = list(range(10))
cut = int(len(data) * 0.8)
train, test = data[:cut], data[cut:]
print(len(train), len(test))
print(test)`,
    codeLang: 'python',
    accepted: ['8 2\n[8, 9]'],
    hint: {
      en: '80% of 10 is 8. The slice [:8] stops before index 8.',
      fr: '80 % de 10 font 8. La tranche [:8] s’arrête avant l’indice 8.',
    },
    explanation: {
      en: 'The model learns on the training set and is then measured on the test set, data it has never seen. Testing on the training data would be like grading students with the exact questions they memorized.',
      fr: 'Le modèle apprend sur l’ensemble d’entraînement puis est évalué sur l’ensemble de test, des données qu’il n’a jamais vues. Tester sur les données d’entraînement reviendrait à noter des élèves avec les questions exactes qu’ils ont apprises par cœur.',
    },
  },
  {
    id: 'ai-005',
    track: 'ai',
    tier: 1,
    kind: 'fill',
    concept: { en: 'Training vs inference', fr: 'Entraînement et inférence' },
    prompt: {
      en: 'With scikit-learn, first train the model on the training data, then ask it for predictions on new data.',
      fr: 'Avec scikit-learn, entraîne d’abord le modèle sur les données d’entraînement, puis demande-lui des prédictions sur de nouvelles données.',
    },
    template: `from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.___(X_train, y_train)
predictions = model.___(X_test)`,
    blanks: [['fit'], ['predict']],
    hint: {
      en: 'One verb means "adjust to the data", the other means "guess the answer".',
      fr: 'Un verbe veut dire « s’ajuster aux données », l’autre « deviner la réponse ».',
    },
    explanation: {
      en: 'fit() is training: the model adjusts its parameters to the examples. predict() is inference: the trained model computes outputs for inputs it has never seen. Almost every scikit-learn model follows this fit/predict pattern.',
      fr: 'fit() correspond à l’entraînement : le modèle ajuste ses paramètres aux exemples. predict() correspond à l’inférence : le modèle entraîné calcule des sorties pour des entrées jamais vues. Presque tous les modèles scikit-learn suivent ce schéma fit/predict.',
    },
  },
  {
    id: 'ai-006',
    track: 'ai',
    tier: 1,
    kind: 'code',
    concept: { en: 'Accuracy', fr: 'Exactitude (accuracy)' },
    prompt: {
      en: 'Write accuracy(predictions, labels): the fraction of predictions equal to the label at the same position. Return 0.0 for empty lists.',
      fr: 'Écris accuracy(predictions, labels) : la proportion de prédictions égales à l’étiquette à la même position. Renvoie 0.0 pour des listes vides.',
    },
    language: 'python',
    starter: `def accuracy(predictions, labels):
    # TODO: count the matches, then divide by the number of examples
    pass`,
    tests: `assert_equal(accuracy(["cat", "dog", "cat", "cat"], ["cat", "dog", "dog", "cat"]), 0.75, "3 out of 4")
assert_equal(accuracy([1, 0, 1], [1, 0, 1]), 1.0, "all correct")
assert_equal(accuracy([1, 1], [0, 0]), 0.0, "all wrong")
assert_equal(accuracy([], []), 0.0, "empty lists")`,
    solution: `def accuracy(predictions, labels):
    if not labels:
        return 0.0
    correct = sum(1 for p, y in zip(predictions, labels) if p == y)
    return correct / len(labels)`,
    hint: {
      en: 'zip(predictions, labels) gives you pairs to compare. Guard against dividing by zero.',
      fr: 'zip(predictions, labels) te donne des paires à comparer. Méfie-toi de la division par zéro.',
    },
    explanation: {
      en: 'Accuracy = correct predictions / total predictions. It is the simplest metric, but it can lie: on data with 99% "not fraud", a model that always says "not fraud" scores 99% while catching nothing. That is why precision and recall exist.',
      fr: 'Exactitude = prédictions correctes / nombre total de prédictions. C’est la métrique la plus simple, mais elle peut mentir : sur des données à 99 % « pas de fraude », un modèle qui répond toujours « pas de fraude » obtient 99 % sans rien détecter. D’où l’existence de la précision et du rappel.',
    },
  },

  // ─────────────────────────── Tier 2 — Apprentice ───────────────────────────
  {
    id: 'ai-007',
    track: 'ai',
    tier: 2,
    kind: 'mcq',
    concept: { en: 'Overfitting', fr: 'Surapprentissage' },
    prompt: {
      en: 'Your model scores 99% on the training set but only 61% on the test set. What is going on?',
      fr: 'Ton modèle obtient 99 % sur l’ensemble d’entraînement mais seulement 61 % sur l’ensemble de test. Que se passe-t-il ?',
    },
    options: [
      { en: 'Underfitting: the model is too simple', fr: 'Sous-apprentissage : le modèle est trop simple' },
      { en: 'Overfitting: it memorized the training data instead of learning general patterns', fr: 'Surapprentissage : il a mémorisé les données d’entraînement au lieu d’apprendre des motifs généraux' },
      { en: 'The test set is broken: test scores should always be higher', fr: 'L’ensemble de test est cassé : les scores de test devraient toujours être plus élevés' },
      { en: 'Everything is fine: 61% is above 50%', fr: 'Tout va bien : 61 % c’est plus que 50 %' },
    ],
    answer: 1,
    hint: {
      en: 'A student who memorized last year\'s exam, word for word, gets a new exam…',
      fr: 'Un élève qui a appris l’examen de l’an dernier par cœur reçoit un nouvel examen…',
    },
    explanation: {
      en: 'A big gap between training and test performance is the signature of overfitting. Remedies: more (or augmented) data, a simpler model, regularization, dropout, or early stopping. Underfitting is the opposite: poor scores on both sets.',
      fr: 'Un grand écart entre les performances d’entraînement et de test est la signature du surapprentissage. Remèdes : plus de données (ou des données augmentées), un modèle plus simple, de la régularisation, du dropout ou un arrêt précoce. Le sous-apprentissage est l’inverse : de mauvais scores sur les deux ensembles.',
    },
  },
  {
    id: 'ai-008',
    track: 'ai',
    tier: 2,
    kind: 'output',
    concept: { en: 'Loss: mean squared error', fr: 'Perte : erreur quadratique moyenne' },
    prompt: {
      en: 'A loss function measures how wrong the model is. What does this print?',
      fr: 'Une fonction de perte mesure à quel point le modèle se trompe. Qu’affiche ce code ?',
    },
    code: `predictions = [3, 5, 2]
targets = [1, 5, 4]
errors = [(p - t) ** 2 for p, t in zip(predictions, targets)]
print(errors)
print(sum(errors) / len(errors))`,
    codeLang: 'python',
    accepted: ['[4, 0, 4]\n2.6666666666666665'],
    hint: {
      en: 'Square each difference, then take the average (8 divided by 3).',
      fr: 'Mets chaque différence au carré, puis fais la moyenne (8 divisé par 3).',
    },
    explanation: {
      en: 'Mean squared error = average of (prediction − target)². Squaring makes every error positive and punishes big mistakes much more than small ones. Training is the search for parameters that make this number as small as possible.',
      fr: 'Erreur quadratique moyenne = moyenne de (prédiction − cible)². Le carré rend chaque erreur positive et punit bien plus les grosses erreurs que les petites. Entraîner, c’est chercher les paramètres qui rendent ce nombre aussi petit que possible.',
    },
  },
  {
    id: 'ai-009',
    track: 'ai',
    tier: 2,
    kind: 'riddle',
    concept: { en: 'Gradient descent', fr: 'Descente de gradient' },
    prompt: {
      en: 'Lost on a foggy mountain of loss,\nI feel the slope beneath my feet\nand take a small step downhill, again and again,\nmy stride set by the learning rate.\nWhich optimization method am I?',
      fr: 'Perdu sur une montagne de perte dans le brouillard,\nje sens la pente sous mes pieds\net fais un petit pas vers le bas, encore et encore,\nla longueur de mes pas fixée par le taux d’apprentissage.\nQuelle méthode d’optimisation suis-je ?',
    },
    accepted: ['gradient descent', 'descente de gradient', 'sgd', 'stochastic gradient descent', 'descente de gradient stochastique'],
    hint: {
      en: 'The slope of a function has a mathematical name; you go down it.',
      fr: 'La pente d’une fonction a un nom mathématique ; on la descend.',
    },
    explanation: {
      en: 'Gradient descent computes the gradient (the direction in which the loss grows fastest) and moves the parameters a little in the opposite direction. Too big a learning rate overshoots the valley; too small takes forever.',
      fr: 'La descente de gradient calcule le gradient (la direction où la perte augmente le plus vite) et déplace un peu les paramètres dans la direction opposée. Un taux d’apprentissage trop grand fait dépasser la vallée ; trop petit, cela prend une éternité.',
    },
  },
  {
    id: 'ai-010',
    track: 'ai',
    tier: 2,
    kind: 'fill',
    concept: { en: 'A gradient descent step', fr: 'Un pas de descente de gradient' },
    prompt: {
      en: 'Complete one training step: move the weight AGAINST the gradient, scaled by the learning rate.',
      fr: 'Complète un pas d’entraînement : déplace le poids DANS LE SENS OPPOSÉ au gradient, en le multipliant par le taux d’apprentissage.',
    },
    template: `learning_rate = 0.1
grad = 2 * (w * x - y) * x   # slope of the loss for this weight
w = w ___ learning_rate ___ grad`,
    blanks: [['-'], ['*']],
    hint: {
      en: 'Going downhill means subtracting. The step size is learning rate times gradient.',
      fr: 'Descendre la pente, c’est soustraire. La taille du pas est le taux d’apprentissage fois le gradient.',
    },
    explanation: {
      en: 'The update rule w = w − learning_rate × gradient is the heart of training neural networks. Repeated over millions of examples (and millions of weights), these tiny steps slowly lower the loss.',
      fr: 'La règle w = w − taux_d’apprentissage × gradient est le cœur de l’entraînement des réseaux de neurones. Répétés sur des millions d’exemples (et des millions de poids), ces petits pas font baisser lentement la perte.',
    },
  },
  {
    id: 'ai-011',
    track: 'ai',
    tier: 2,
    kind: 'bug',
    concept: { en: 'k-nearest neighbours', fr: 'k plus proches voisins' },
    prompt: {
      en: 'This k-NN classifier should vote among the k CLOSEST points, but it picks the farthest ones. Click the buggy line.',
      fr: 'Ce classifieur k-NN devrait faire voter les k points LES PLUS PROCHES, mais il prend les plus éloignés. Clique sur la ligne fautive.',
    },
    lines: [
      'def knn_predict(points, query, k=3):',
      '    dists = [(abs(x - query), label) for x, label in points]',
      '    dists.sort(reverse=True)',
      '    votes = [label for _, label in dists[:k]]',
      '    return max(set(votes), key=votes.count)',
    ],
    bugLine: 2,
    hint: {
      en: 'After sorting, the first k items are kept. Which ones end up first?',
      fr: 'Après le tri, on garde les k premiers éléments. Lesquels se retrouvent en tête ?',
    },
    explanation: {
      en: 'sort(reverse=True) puts the LARGEST distances first, so the vote uses the farthest points. A plain sort() keeps the nearest ones in front. k-NN has no training phase: it simply compares a new point with the stored examples.',
      fr: 'sort(reverse=True) place les PLUS GRANDES distances en tête, donc le vote utilise les points les plus éloignés. Un simple sort() garde les plus proches devant. Le k-NN n’a pas de phase d’entraînement : il compare simplement un nouveau point aux exemples mémorisés.',
    },
  },
  {
    id: 'ai-012',
    track: 'ai',
    tier: 2,
    kind: 'code',
    concept: { en: 'Feature scaling', fr: 'Mise à l’échelle des données' },
    prompt: {
      en: 'Write normalize(values): min-max scaling so the smallest value becomes 0.0 and the largest 1.0. If all values are equal, return a list of 0.0.',
      fr: 'Écris normalize(values) : une mise à l’échelle min-max pour que la plus petite valeur devienne 0.0 et la plus grande 1.0. Si toutes les valeurs sont égales, renvoie une liste de 0.0.',
    },
    language: 'python',
    starter: `def normalize(values):
    # TODO: (v - min) / (max - min) for every value
    pass`,
    tests: `assert_equal(normalize([10, 20, 30]), [0.0, 0.5, 1.0], "three values")
assert_equal(normalize([5, 1, 3]), [1.0, 0.0, 0.5], "unsorted")
assert_equal(normalize([7, 7]), [0.0, 0.0], "all equal")`,
    solution: `def normalize(values):
    lo, hi = min(values), max(values)
    if hi == lo:
        return [0.0 for _ in values]
    return [(v - lo) / (hi - lo) for v in values]`,
    hint: {
      en: 'Compute min and max once, then use a list comprehension. Watch out for max == min.',
      fr: 'Calcule min et max une seule fois, puis utilise une compréhension de liste. Attention au cas max == min.',
    },
    explanation: {
      en: 'Features on very different scales (age 0–100, salary 0–100,000) confuse many algorithms: distances and gradients get dominated by the big numbers. Scaling them to a common range makes training faster and fairer.',
      fr: 'Des caractéristiques sur des échelles très différentes (âge 0–100, salaire 0–100 000) perturbent beaucoup d’algorithmes : les distances et les gradients sont dominés par les grands nombres. Les ramener à une même plage rend l’entraînement plus rapide et plus équitable.',
    },
  },

  // ───────────────────────────── Tier 3 — Adept ─────────────────────────────
  {
    id: 'ai-013',
    track: 'ai',
    tier: 3,
    kind: 'output',
    concept: { en: 'An artificial neuron', fr: 'Un neurone artificiel' },
    prompt: {
      en: 'A neuron computes a weighted sum plus a bias, then applies an activation. What does this print?',
      fr: 'Un neurone calcule une somme pondérée plus un biais, puis applique une activation. Qu’affiche ce code ?',
    },
    code: `inputs = [1, 2]
weights = [0.5, -1]
bias = 1
z = sum(i * w for i, w in zip(inputs, weights)) + bias
relu = max(0, z)
print(z, relu)`,
    codeLang: 'python',
    accepted: ['-0.5 0'],
    hint: {
      en: '1 × 0.5 + 2 × (−1) + 1. ReLU keeps positive numbers and turns negatives into 0.',
      fr: '1 × 0,5 + 2 × (−1) + 1. ReLU garde les nombres positifs et transforme les négatifs en 0.',
    },
    explanation: {
      en: 'z = 0.5 − 2 + 1 = −0.5, and ReLU(z) = max(0, z) = 0, so this neuron stays silent. Without non-linear activations like ReLU, stacking layers would still only compute one big linear function.',
      fr: 'z = 0,5 − 2 + 1 = −0,5, et ReLU(z) = max(0, z) = 0 : ce neurone reste muet. Sans activations non linéaires comme ReLU, empiler des couches ne calculerait qu’une grosse fonction linéaire.',
    },
  },
  {
    id: 'ai-014',
    track: 'ai',
    tier: 3,
    kind: 'mcq',
    concept: { en: 'Backpropagation', fr: 'Rétropropagation' },
    prompt: {
      en: 'What does backpropagation do during the training of a neural network?',
      fr: 'Que fait la rétropropagation pendant l’entraînement d’un réseau de neurones ?',
    },
    options: [
      { en: 'It sends the input backwards to check the data for errors', fr: 'Elle renvoie l’entrée en arrière pour vérifier les données' },
      { en: 'It uses the chain rule to compute how much each weight contributed to the loss (its gradient)', fr: 'Elle utilise la règle de dérivation en chaîne pour calculer la contribution de chaque poids à la perte (son gradient)' },
      { en: 'It removes the neurons that are never activated', fr: 'Elle supprime les neurones qui ne s’activent jamais' },
      { en: 'It replaces gradient descent, so no learning rate is needed', fr: 'Elle remplace la descente de gradient, donc plus besoin de taux d’apprentissage' },
    ],
    answer: 1,
    hint: {
      en: 'Gradient descent needs one number per weight. Something has to compute them all, efficiently, from the output back to the input.',
      fr: 'La descente de gradient a besoin d’un nombre par poids. Il faut bien les calculer tous, efficacement, de la sortie vers l’entrée.',
    },
    explanation: {
      en: 'After a forward pass computes the loss, backpropagation walks the network from the output layer back to the first one, applying the chain rule to get the gradient of the loss for every weight. The optimizer (gradient descent, Adam…) then uses those gradients to update the weights.',
      fr: 'Après une passe avant qui calcule la perte, la rétropropagation parcourt le réseau de la couche de sortie jusqu’à la première en appliquant la règle de dérivation en chaîne, pour obtenir le gradient de la perte pour chaque poids. L’optimiseur (descente de gradient, Adam…) utilise ensuite ces gradients pour mettre à jour les poids.',
    },
  },
  {
    id: 'ai-015',
    track: 'ai',
    tier: 3,
    kind: 'code',
    concept: { en: 'Precision and recall', fr: 'Précision et rappel' },
    prompt: {
      en: 'A fraud detector found tp true frauds, raised fp false alarms and missed fn frauds. Write precision(tp, fp) and recall(tp, fn). Return 0.0 when the denominator is 0.',
      fr: 'Un détecteur de fraude a trouvé tp vraies fraudes, levé fp fausses alertes et raté fn fraudes. Écris precision(tp, fp) et recall(tp, fn). Renvoie 0.0 quand le dénominateur vaut 0.',
    },
    language: 'python',
    starter: `def precision(tp, fp):
    # TODO: of everything flagged, how much was really fraud?
    pass

def recall(tp, fn):
    # TODO: of all the real frauds, how many did we catch?
    pass`,
    tests: `assert_equal(precision(8, 2), 0.8, "precision 8/10")
assert_equal(recall(8, 8), 0.5, "recall 8/16")
assert_equal(precision(0, 0), 0.0, "nothing flagged")
assert_equal(recall(0, 0), 0.0, "no fraud at all")`,
    solution: `def precision(tp, fp):
    return tp / (tp + fp) if tp + fp else 0.0

def recall(tp, fn):
    return tp / (tp + fn) if tp + fn else 0.0`,
    hint: {
      en: 'Precision = tp / (tp + fp). Recall = tp / (tp + fn).',
      fr: 'Précision = tp / (tp + fp). Rappel = tp / (tp + fn).',
    },
    explanation: {
      en: 'Precision answers "when the model says yes, is it right?"; recall answers "did it find all the real cases?". A detector that flags everything has perfect recall and terrible precision. The F1 score combines both.',
      fr: 'La précision répond à « quand le modèle dit oui, a-t-il raison ? » ; le rappel à « a-t-il trouvé tous les vrais cas ? ». Un détecteur qui signale tout a un rappel parfait et une précision catastrophique. Le score F1 combine les deux.',
    },
  },
  {
    id: 'ai-016',
    track: 'ai',
    tier: 3,
    kind: 'riddle',
    concept: { en: 'Embeddings', fr: 'Plongements (embeddings)' },
    prompt: {
      en: 'I turn a word, a picture or a song\ninto a long list of numbers, a point in space.\n"King" and "queen" live close together in my world,\nfar away from "carburetor".\nWhat am I?',
      fr: 'Je transforme un mot, une image ou une chanson\nen une longue liste de nombres, un point dans l’espace.\n« Roi » et « reine » habitent tout près l’un de l’autre chez moi,\nloin de « carburateur ».\nQue suis-je ?',
    },
    accepted: ['embedding', 'embeddings', 'an embedding', 'vector embedding', 'plongement', 'plongements', 'un plongement', 'vecteur', 'vector'],
    hint: {
      en: 'Search engines and RAG systems compare these vectors with cosine similarity.',
      fr: 'Les moteurs de recherche et les systèmes RAG comparent ces vecteurs avec la similarité cosinus.',
    },
    explanation: {
      en: 'An embedding is a learned vector representation where similar meanings get nearby vectors. They power semantic search, recommendations and retrieval-augmented generation: you embed the question and look for the documents whose vectors are closest.',
      fr: 'Un plongement (embedding) est une représentation vectorielle apprise où les sens proches obtiennent des vecteurs voisins. Ils alimentent la recherche sémantique, les recommandations et la génération augmentée par récupération : on encode la question et on cherche les documents dont les vecteurs sont les plus proches.',
    },
  },
  {
    id: 'ai-017',
    track: 'ai',
    tier: 3,
    kind: 'bug',
    concept: { en: 'Softmax', fr: 'Softmax' },
    prompt: {
      en: 'softmax should turn raw scores into probabilities that add up to 1. One line breaks that promise. Click it.',
      fr: 'softmax doit transformer des scores bruts en probabilités dont la somme vaut 1. Une ligne trahit cette promesse. Clique dessus.',
    },
    lines: [
      'import math',
      '',
      'def softmax(scores):',
      '    exps = [math.exp(s - max(scores)) for s in scores]',
      '    total = max(exps)',
      '    return [e / total for e in exps]',
    ],
    bugLine: 4,
    hint: {
      en: 'To make numbers add up to 1, what do you divide each of them by?',
      fr: 'Pour que des nombres totalisent 1, par quoi divise-t-on chacun d’eux ?',
    },
    explanation: {
      en: 'Softmax divides each exponential by the SUM of all exponentials, so the outputs are positive and add up to 1. Dividing by the max gives values up to 1 that do not form a distribution. (Subtracting max(scores) first is a standard trick to avoid overflow.)',
      fr: 'Softmax divise chaque exponentielle par la SOMME de toutes les exponentielles, pour que les sorties soient positives et totalisent 1. Diviser par le maximum donne des valeurs jusqu’à 1 qui ne forment pas une distribution. (Soustraire max(scores) au début est une astuce classique pour éviter les débordements.)',
    },
  },

  // ───────────────────────────── Tier 4 — Expert ─────────────────────────────
  {
    id: 'ai-018',
    track: 'ai',
    tier: 4,
    kind: 'mcq',
    concept: { en: 'Transformers and attention', fr: 'Transformers et attention' },
    prompt: {
      en: 'In a Transformer, what does self-attention let each token do?',
      fr: 'Dans un Transformer, que permet l’auto-attention à chaque token ?',
    },
    options: [
      { en: 'Read only the token right before it, one step at a time like an RNN', fr: 'Lire seulement le token juste avant lui, pas à pas comme un RNN' },
      { en: 'Look at every other token and weigh how relevant each one is (query × key), then mix their values', fr: 'Regarder tous les autres tokens et pondérer leur pertinence (requête × clé), puis mélanger leurs valeurs' },
      { en: 'Pay attention to the user and ignore the prompt', fr: 'Faire attention à l’utilisateur et ignorer le prompt' },
      { en: 'Store the whole internet so it never needs training', fr: 'Stocker tout Internet pour ne jamais avoir besoin d’entraînement' },
    ],
    answer: 1,
    hint: {
      en: 'In "The bank of the river", how does "bank" know it is not about money?',
      fr: 'Dans « l’avocat a mangé un avocat », comment chaque « avocat » sait-il de quoi on parle ?',
    },
    explanation: {
      en: 'Self-attention compares each token\'s query with every token\'s key to get attention weights, then takes a weighted mix of their values. Every token sees the whole context at once, and all positions are computed in parallel, which is why Transformers scale so well and power today\'s LLMs.',
      fr: 'L’auto-attention compare la requête de chaque token aux clés de tous les tokens pour obtenir des poids d’attention, puis fait un mélange pondéré de leurs valeurs. Chaque token voit tout le contexte d’un coup, et toutes les positions se calculent en parallèle : c’est pourquoi les Transformers passent si bien à l’échelle et font tourner les LLM actuels.',
    },
  },
  {
    id: 'ai-019',
    track: 'ai',
    tier: 4,
    kind: 'output',
    concept: { en: 'Next-token decoding', fr: 'Décodage du token suivant' },
    prompt: {
      en: 'A language model gives these probabilities for the next token after "The hero pets the…". What does this print?',
      fr: 'Un modèle de langage donne ces probabilités pour le token suivant après « The hero pets the… ». Qu’affiche ce code ?',
    },
    code: `probs = {"cat": 0.2, "dog": 0.5, "fish": 0.25, "rock": 0.05}
greedy = max(probs, key=probs.get)
top2 = sorted(probs, key=probs.get, reverse=True)[:2]
print(greedy)
print(top2)`,
    codeLang: 'python',
    accepted: ["dog\n['dog', 'fish']"],
    hint: {
      en: 'Greedy decoding takes the single most likely token. top-2 keeps the two best.',
      fr: 'Le décodage glouton prend le token le plus probable. Le top-2 garde les deux meilleurs.',
    },
    explanation: {
      en: 'LLMs generate text one token at a time from a probability distribution. Greedy decoding always takes the most likely token; sampling with top-k, top-p or a higher temperature picks among several candidates, giving more varied (and sometimes less accurate) text.',
      fr: 'Les LLM génèrent le texte token par token à partir d’une distribution de probabilités. Le décodage glouton prend toujours le token le plus probable ; l’échantillonnage avec top-k, top-p ou une température plus élevée choisit parmi plusieurs candidats, ce qui donne un texte plus varié (et parfois moins exact).',
    },
  },
  {
    id: 'ai-020',
    track: 'ai',
    tier: 4,
    kind: 'mcq',
    concept: { en: 'Retrieval-augmented generation', fr: 'Génération augmentée par récupération (RAG)' },
    prompt: {
      en: 'Your company chatbot must answer questions about internal documents the model was never trained on. What does RAG do?',
      fr: 'Le chatbot de ton entreprise doit répondre sur des documents internes que le modèle n’a jamais vus à l’entraînement. Que fait le RAG ?',
    },
    options: [
      { en: 'It retrains the whole model every night on all the documents', fr: 'Il réentraîne tout le modèle chaque nuit sur tous les documents' },
      { en: 'It searches the documents for relevant passages and puts them in the prompt, so the model answers from them', fr: 'Il cherche les passages pertinents dans les documents et les met dans le prompt, pour que le modèle réponde à partir d’eux' },
      { en: 'It raises the temperature so the model guesses more creatively', fr: 'Il augmente la température pour que le modèle devine plus créativement' },
      { en: 'It blocks every question that is not in the training data', fr: 'Il bloque toute question absente des données d’entraînement' },
    ],
    answer: 1,
    hint: {
      en: 'R is for Retrieval: find first, then generate.',
      fr: 'R comme Récupération (Retrieval) : d’abord chercher, ensuite générer.',
    },
    explanation: {
      en: 'Retrieval-augmented generation embeds the question, retrieves the closest document chunks (often from a vector database) and adds them to the prompt. The model grounds its answer in fresh, private sources, which reduces hallucinations and lets you cite where the answer came from, without retraining.',
      fr: 'La génération augmentée par récupération encode la question, récupère les extraits de documents les plus proches (souvent dans une base vectorielle) et les ajoute au prompt. Le modèle appuie sa réponse sur des sources fraîches et privées, ce qui réduit les hallucinations et permet de citer d’où vient la réponse, sans réentraînement.',
    },
  },
  {
    id: 'ai-021',
    track: 'ai',
    tier: 4,
    kind: 'riddle',
    concept: { en: 'Hallucinations', fr: 'Hallucinations' },
    prompt: {
      en: 'I sound sure, I sound smart,\nI quote a book that was never written\nand a law that was never passed.\nI am not a lie, just a fluent guess.\nWhat do we call me when a language model does this?',
      fr: 'J’ai l’air sûr, j’ai l’air savant,\nje cite un livre jamais écrit\net une loi jamais votée.\nJe ne suis pas un mensonge, juste une supposition bien tournée.\nComment appelle-t-on cela quand un modèle de langage le fait ?',
    },
    accepted: ['hallucination', 'hallucinations', 'a hallucination', 'une hallucination', 'confabulation'],
    hint: {
      en: 'Same word as when you see things that are not there.',
      fr: 'Le même mot que lorsqu’on voit des choses qui n’existent pas.',
    },
    explanation: {
      en: 'A hallucination is fluent, confident output that is false or unsupported. LLMs predict plausible text, not verified facts. Mitigations: grounding with RAG, asking for sources, lower temperature, letting the model say "I don\'t know", and always checking important answers.',
      fr: 'Une hallucination est une sortie fluide et assurée mais fausse ou non étayée. Les LLM prédisent un texte plausible, pas des faits vérifiés. Parades : ancrer les réponses avec du RAG, demander des sources, baisser la température, autoriser le modèle à dire « je ne sais pas », et toujours vérifier les réponses importantes.',
    },
  },
  {
    id: 'ai-022',
    track: 'ai',
    tier: 4,
    kind: 'order',
    concept: { en: 'The training loop', fr: 'La boucle d’entraînement' },
    prompt: {
      en: 'Put this PyTorch-style training loop in order: predict, measure the loss, compute gradients, then update the weights.',
      fr: 'Remets dans l’ordre cette boucle d’entraînement façon PyTorch : prédire, mesurer la perte, calculer les gradients, puis mettre à jour les poids.',
    },
    lines: [
      'for epoch in range(epochs):',
      '    predictions = model(inputs)',
      '    loss = loss_fn(predictions, targets)',
      '    loss.backward()',
      '    optimizer.step()',
    ],
    hint: {
      en: 'Forward pass first, then backward pass, and only then can the optimizer use the gradients.',
      fr: 'D’abord la passe avant, puis la passe arrière, et seulement ensuite l’optimiseur peut utiliser les gradients.',
    },
    explanation: {
      en: 'Every epoch: a forward pass produces predictions, the loss function scores them, backward() runs backpropagation to fill each weight\'s gradient, and optimizer.step() applies the update. (Real code also calls optimizer.zero_grad() so gradients do not pile up between steps.)',
      fr: 'À chaque époque : une passe avant produit les prédictions, la fonction de perte les note, backward() lance la rétropropagation pour remplir le gradient de chaque poids, et optimizer.step() applique la mise à jour. (Le vrai code appelle aussi optimizer.zero_grad() pour que les gradients ne s’accumulent pas d’un pas à l’autre.)',
    },
  },
];
