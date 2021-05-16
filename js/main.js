$(document).ready(function () {
    var place = $('select').val();
    // var url = 'data/table-beds.json';
    // $table = $('#table-beds');
    // $table_ambulance = $('#table-ambulance');
    // $table_remdesivir = $('#table-remdesivir');
    // $table_testing = $('#table-testing');
    tables = ['beds','ambulance','remdesivir','testing'];
    // tables = ['beds'];
    init_hidden_tables = ['ambulance','remdesivir','testing'];

    
    $.each(tables, function(i,tab){
        url = 'data/table-'+tab+'.json';
        $table = $('#table-'+tab);
        init_table(url, $table);
    })

    show_only_default_table();

    $(".parent").on("click", function () {
      $('.parent').removeClass('highlight');
      $(this).addClass('highlight');
      $id = this.id;
      $table = $('#table-'+$id);
      $('.bootstrap-table').hide();
      $table.closest('.bootstrap-table').show();
      refresh_table($table);
    });

    // This needs to change. This is a temp fix
    function show_only_default_table(){
      $('.bootstrap-table').hide();
      $id = $(".highlight")[0].id;
      log($id)
      $table = $('#table-'+$id);   
      console.warn($table)
      $table.closest('.bootstrap-table').show();
      refresh_table($table);
    }


    function update_url(id) {
      $table.bootstrapTable('load',{
        url: 'data/table-'+id+'.json'
      })
    }
    
    function init_table(url, $table){
      $table.bootstrapTable({
        showColumns: true,
        search: true,
        showRefresh: true,
        url: url,
        responseHandler: function (result) {
          json = [];
          if(place && (place in result)){
            json = result[place];
          }
          return json;
        }
      });
    }

    $('select').on('change',function(){
      place = this.value;  
      $id = $(".highlight")[0].id;
      log($id)
      $table = $('#table-'+$id);    
      refresh_table($table);
    });

  });

  function refresh_table($table){
    // console.warn($table)
    $table.bootstrapTable('refresh');
  }

  function log($log){
    console.log($log);
  }