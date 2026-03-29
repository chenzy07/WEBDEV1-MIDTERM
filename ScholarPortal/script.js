function showDashboardHome(){
  document.getElementById('dashboardHome').style.display='flex'; // or 'block'
  document.getElementById('subjectPage').style.display='none';
}

// SUBJECT DATA
  const subjectData = {
    web: { title: 'Web Development', assignments: ['Build Portfolio Website', 'CSS Layout Activity'], grade: '88%' },
    db: { title: 'Database Systems', assignments: ['ER Diagram', 'SQL Queries Task'], grade: '85%' },
    net: { title: 'Networking', assignments: ['IP Addressing Quiz', 'Topology Activity'], grade: '90%' }
  };

  function openSubject(subject) {
    document.getElementById('dashboardHome').style.display='none';
    document.getElementById('subjectPage').style.display='block';
    const data = subjectData[subject];
    document.getElementById('subjectTitle').innerText = data.title;

    const list = document.getElementById('assignmentList');
    list.innerHTML='';
    data.assignments.forEach(a=>{
      const li = document.createElement('li'); li.innerText=a; list.appendChild(li);
    });

    document.getElementById('gradeDisplay').innerText = data.grade;
  }

  function backToDashboard(){ showDashboardHome(); }

  